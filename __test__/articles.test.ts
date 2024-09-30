import { POST } from '../app/api/articles/route'
import { loadJsonData } from '../app/_utils/vercel_kv_handler'
import { getCurrentUser } from '../app/_utils/auth'

jest.mock('../app/_utils/jsonStorageHandler', () => ({
  loadJsonData: jest.fn(),
  saveJsonData: jest.fn()
}))

jest.mock('../app/_utils/auth', () => ({
  getCurrentUser: jest.fn()
}))

describe('POST /api/articles', () => {
  it('creates an article successfully', async () => {
    const mockUser = { username: 'testuser', bio: '', image: '' }
    ;(getCurrentUser as jest.Mock).mockResolvedValue(mockUser)
    ;(loadJsonData as jest.Mock).mockResolvedValue([])

    const req = new Request('http://localhost:3000/api/articles', {
      method: 'POST',
      body: JSON.stringify({
        article: {
          title: 'Test Article',
          description: 'Test Desc',
          body: 'Test Body'
        }
      })
    })

    const response = await POST(req)
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result.article.title).toBe('Test Article')
  })

  it('returns 401 if unauthorized', async () => {
    ;(getCurrentUser as jest.Mock).mockResolvedValue(null)

    const req = new Request('http://localhost:3000/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })

    const response = await POST(req)

    expect(response.status).toBe(401)
  })
})
