import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Health (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to check application health', async () => {
    const response = await request(app.server).get('/health').send()

    expect(response.statusCode).toEqual(200)
  })
})
