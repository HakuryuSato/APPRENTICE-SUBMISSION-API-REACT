import type { NextApiRequest, NextApiResponse } from 'next';

type User = { email: string; password: string };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const users: User[] = []; // 追加
    const user = users.find((u) => u.email === email && u.password === password);
  
    if (!user) {
      return res.status(401).json({ errors: { message: 'Invalid credentials' } });
    }
  
    res.status(200).json({ user });
  }
