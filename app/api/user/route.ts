import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import type { User } from '@/app/_custom-types/user';
import { loadJsonData } from '@utils/vercel_kv_handler';

const SECRET = process.env.JWT_SECRET!;

// 現在のユーザー情報を取得
export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Token ')) {
    return NextResponse.json({ errors: { message: 'Authorization header missing' } }, { status: 401 });
  }
  const token = authHeader.slice(6);
  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    const users = await loadJsonData<User>('users');
    const user = users.find((u) => u.email === decoded.email);
    if (!user) {
      return NextResponse.json({ errors: { message: 'User not found' } }, { status: 404 });
    }
    return NextResponse.json({
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio || '',
        image: user.image || '',
        token,
      },
    }, { status: 200 });
  } catch {
    return NextResponse.json({ errors: { message: 'Invalid token' } }, { status: 401 });
  }
}
