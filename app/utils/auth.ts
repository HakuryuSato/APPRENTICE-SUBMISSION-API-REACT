import jwt from 'jsonwebtoken';
import { User } from '@/app/types/user';
import { loadData } from './dataHandler';

const SECRET = process.env.JWT_SECRET!;

export async function getCurrentUser(req: Request): Promise<User | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Token ')) {
    return null;
  }
  const token = authHeader.slice(6); // 'Token 'の部分を除去
  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    const users = await loadData<User>('users');
    const user = users.find((u) => u.email === decoded.email);
    return user || null;
  } catch {
    return null;
  }
}
