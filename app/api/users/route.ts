import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';

type User = {
  username: string;
  email: string;
  password: string;
};

const filePath = './local_data/users.json';

// POST
export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, username } = body.user || {};

  if (!username || !email || !password) {
    return NextResponse.json({ errors: { message: 'Missing fields' } }, { status: 422 });
  }

  const users = await loadUsers();

  if (users.some((user: User) => user.email === email)) {
    return NextResponse.json({ errors: { message: 'Email already registered' } }, { status: 409 });
  }

  const newUser: User = { username, email, password };
  users.push(newUser);
  await saveUsers(users);

  return NextResponse.json({ user: newUser }, { status: 201 });
}



// ユーザー情報読み込み用関数
async function loadUsers(): Promise<User[]> {
  if (process.env.NODE_ENV === 'production') {
    // 本番環境ではVercel KVからデータを取得
    const data = await kv.get<User[]>('users');
    return data || [];
  } else {
    // ローカル環境ではファイルシステムからデータを取得
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as User[];
    } catch {
      return [];
    }
  }
}

// ユーザー情報保存用関数
async function saveUsers(users: User[]): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    // 本番環境ではVercel KVにデータを保存
    await kv.set('users', users);
  } else {
    // ローカル環境ではファイルシステムにデータを保存
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }
}

