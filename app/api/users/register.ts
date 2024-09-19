import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  username: string
  email: string
  password: string
}

const users: User[] = []

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(422).json({ errors: { message: 'Missing fields' } })
  }

  const newUser = { username, email, password }
  users.push(newUser)

  res.status(201).json({ user: newUser })
}
