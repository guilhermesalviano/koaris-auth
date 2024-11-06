import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../app'

describe('API Status', () => {
  it('should return 200 OK for the root endpoint', async () => {
    const response = await request(app).get('/status')
    expect(response.status).toBe(200)
    expect(response.text).toBe(`{"message":"Everything's fine!"}`)
  })

  it('should return 404 Not Found for an invalid endpoint', async () => {
    const response = await request(app).get('/invalid')
    expect(response.status).toBe(404)
  })
})
