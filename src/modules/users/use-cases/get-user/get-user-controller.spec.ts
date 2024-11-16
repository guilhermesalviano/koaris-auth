import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../../../../infra/http/app'
import { createAndAuthenticateUser } from '../../../../test/factories/user-factory'

const {
  jwt: { token },
} = createAndAuthenticateUser()

describe('Get a User', () => {
  it('should be able to get a user', async () => {
    const response = await request(app).get('/users').set('x-access-token', token).send({})

    expect(response.status).toBe(200)
  })
})
