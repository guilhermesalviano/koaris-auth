import request from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'

import { app } from '@infra/http/app'
import { prisma } from '@infra/prisma/client'
import { Password } from '@core/entities/user/password'
import { Chance } from 'chance'
import { createAndAuthenticateUser } from '@test/factories/user-factory'

const {
  jwt: { token },
} = createAndAuthenticateUser()

const chance = new Chance()

describe('Create a user', () => {
  afterAll(async () => {
    // redisConnection.disconnect()
    await prisma.$disconnect()
  })

  it('should be able to create new user', async () => {
    const name = chance.name()
    const email = chance.email()

    const response = await request(app)
      .post('/users')
      .set('x-access-token', token)
      .send({
        name,
        email,
        password: await Password.create('123456').getHashedValue(),
        updated_at: new Date(),
        created_at: new Date()
      })

    expect(response.status).toBe(201)

    const userInDatabase = await prisma.user.findFirst({
      where: { email },
    })

    expect(userInDatabase).toBeTruthy()
  })
})
