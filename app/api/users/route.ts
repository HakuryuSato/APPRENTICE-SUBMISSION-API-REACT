import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { User } from '@/app/_custom-types/user';
import { loadJsonData, saveJsonData } from '@utils/vercel_kv_handler';

const SECRET = process.env.JWT_SECRET!;

// ユーザー登録
export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, username, bio } = body.user || {};

  if (!username || !email || !password) {
    return NextResponse.json(
      { errors: { message: 'Missing fields' } },
      { status: 422 }
    );
  }

  const users = await loadJsonData<User>('users');

  if (users.some((user: User) => user.email === email)) {
    return NextResponse.json(
      { errors: { message: 'Email already registered' } },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // デモ用の固定画像URLを設定
  const demoImage = 'https://api.realworld.io/images/demo-avatar.png';

  const newUser: User = { 
    username, 
    email, 
    password: hashedPassword, 
    bio, 
    image: demoImage
  };
  users.push(newUser);
  await saveJsonData<User>('users', users);

  const token = jwt.sign({ email: newUser.email }, SECRET, { expiresIn: '1h' });

  return NextResponse.json(
    {
      user: {
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio || '',
        image: newUser.image,
        token,
      },
    },
    { status: 201 }
  );
}
