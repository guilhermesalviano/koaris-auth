import request from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'
import { Chance } from 'chance'

import { app } from '../../../../infra/http/app'
import { prisma } from '../../../../infra/prisma/client'
import { createAndAuthenticateUser } from '../../../../test/factories/user-factory'

const {
  jwt: { token },
} = createAndAuthenticateUser()

const chance = new Chance()

describe('Create a system', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to create new system', async () => {
    const name = chance.character()
    const description = chance.paragraph()

    const response = await request(app)
      .post('/systems')
      .set('x-access-token', token)
      .send({
        name,
        description,
        updated_at: new Date(),
        created_at: new Date(),
      })

    expect(response.status).toBe(201)

    const systemInDatabase = await prisma.system.findFirst({
      where: { name },
    })

    expect(systemInDatabase).toBeTruthy()
  })
})
