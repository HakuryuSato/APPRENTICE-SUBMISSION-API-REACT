import jwt from 'jsonwebtoken';
import type { User } from '@/app/types/user';
import { loadJsonData } from '@/app/utils/jsonStorageHandler';

const SECRET = process.env.JWT_SECRET!;

export async function getCurrentUser(req: Request): Promise<User | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Token ')) {
    return null;
  }
  const token = authHeader.slice(6);
  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    const users = await loadJsonData<User>('users');
    const user = users.find((u) => u.email === decoded.email);
    return user || null;
  } catch {
    return null;
  }
}
