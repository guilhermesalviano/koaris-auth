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

describe('Link a user to a system', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to link a user to a system', async () => {

    const user_id = "d29363a5-2323-47f5-a144-e01fa25bca16"
    const system_id = "5769e880-7f73-45b7-aec0-6cb5cfaa70c7"

    const response = await request(app)
      .post('/user-systems')
      .set('x-access-token', token)
      .send({
          user_id,
          system_id,
          login_active: true
      })

    expect(response.status).toBe(201)

    const systemInDatabase = await prisma.userSystems.findFirst({
      where: {
        user_id,
        system_id
      },
    })

    expect(systemInDatabase).toBeTruthy()
  })
})
