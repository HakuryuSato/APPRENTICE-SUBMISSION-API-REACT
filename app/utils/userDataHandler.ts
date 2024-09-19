// import { kv } from '@vercel/kv'
// import fs from 'fs'
// import type { User } from '@/app/types/user'

// const filePath = './local_data/users.json';

// // ユーザー情報読み込み用関数
// export async function loadUsers (): Promise<User[]> {
//   if (process.env.NODE_ENV === 'production') {
//     // 本番環境ではVercel KVからデータを取得
//     const data = await kv.get<User[]>('users')
//     return data || []
//   } else {
//     // ローカル環境ではファイルシステムからデータを取得
//     try {
//       const data = fs.readFileSync(filePath, 'utf-8')
//       return JSON.parse(data) as User[]
//     } catch {
//       return []
//     }
//   }
// }

// // ユーザー情報保存用関数
// export async function saveUsers (users: User[]): Promise<void> {
//   if (process.env.NODE_ENV === 'production') {
//     // 本番環境ではVercel KVにデータを保存
//     await kv.set('users', users)
//   } else {
//     // ローカル環境ではファイルシステムにデータを保存
//     fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
//   }
// }
