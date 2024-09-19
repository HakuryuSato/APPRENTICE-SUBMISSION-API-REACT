import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import type { User } from '@/app/types/user'
import { loadJsonData, saveJsonData } from '@/app/utils/jsonStorageHandler'

const SECRET = process.env.JWT_SECRET!

// POST
export async function POST (req: Request) {
  const body = await req.json()
  const { email, password, username, bio, image } = body.user || {}

  if (!username || !email || !password) {
    return NextResponse.json(
      { errors: { message: 'Missing fields' } },
      { status: 422 }
    )
  }

  const users = await loadJsonData<User>('users')

  if (users.some((user: User) => user.email === email)) {
    return NextResponse.json(
      { errors: { message: 'Email already registered' } },
      { status: 409 }
    )
  }

  const newUser: User = { username, email, password, bio, image }
  users.push(newUser)
  await saveJsonData<User>('users', users)

  const token = jwt.sign({ email: newUser.email }, SECRET, { expiresIn: '1h' })

  return NextResponse.json(
    {
      user: {
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio || '',
        image: newUser.image || '',
        token
      }
    },
    { status: 201 }
  )
}
