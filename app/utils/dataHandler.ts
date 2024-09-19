import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const dataDir = './local_data';


// DBの代替として、JSONファイルでデータを読み書きするための汎用関数

// 読み込み
export async function loadData<T>(key: string): Promise<T[]> {
  if (process.env.NODE_ENV === 'production') {
    const data = await kv.get<T[]>(key);
    return data || [];
  } else {
    const filePath = path.join(dataDir, `${key}.json`);
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as T[];
    } catch {
      return [];
    }
  }
}

// 書き込み
export async function saveData<T>(key: string, data: T[]): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    await kv.set(key, data);
  } else {
    const filePath = path.join(dataDir, `${key}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
