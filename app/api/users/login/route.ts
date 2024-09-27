import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import type { User } from '@custom-types/user'
import { loadJsonData } from '@utils/jsonStorageHandler'

const SECRET = process.env.JWT_SECRET!;

// ログイン
export async function POST (req: Request) {
  const body = await req.json()
  const { email, password } = body.user || {}

  if (!email || !password) {
    return NextResponse.json(
      { errors: { message: 'Email and password are required' } },
      { status: 422 }
    )
  }

  const users = await loadJsonData<User>('users')
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json(
      { errors: { message: 'Invalid credentials' } },
      { status: 401 }
    )
  }

  const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' })

  return NextResponse.json(
    {
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio || '',
        image: user.image || '',
        token
      }
    },
    { status: 200 }
  )
}
