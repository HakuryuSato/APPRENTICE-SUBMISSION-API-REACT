import { createClient, kv } from '@vercel/kv';

const kvClient = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function loadJsonData<T>(key: string): Promise<T[]> {
  if (process.env.NODE_ENV === 'production') {
    const data = await kv.get<T[]>(key);
    return data || [];
  } else {
    const data = await kvClient.get<T[]>(key);
    return data || [];
  }
}

export async function saveJsonData<T>(key: string, data: T[]): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    await kv.set(key, data);
  } else {
    await kvClient.set(key, data);
  }
}
