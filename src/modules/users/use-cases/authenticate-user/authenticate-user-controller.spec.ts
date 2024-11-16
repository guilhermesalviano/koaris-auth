import bcrypt from 'bcryptjs'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

import { app } from '../../../../infra/http/app'
import { prisma } from '../../../../infra/prisma/client'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { Chance } from 'chance'

const chance = new Chance()
const email = chance.email()

describe('Authenticate User (e2e)', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: uuid(),
        name: 'John Doe',
        email,
        password: await bcrypt.hash('123456', 8),
        updated_at: new Date(),
        created_at: new Date()
      },
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to authenticate', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password: '123456',
      })

    expect(response.status).toBe(200)

    expect(response.body).toEqual({ token: expect.any(String) });
  })
})