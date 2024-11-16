import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySystemsRepository } from '../../../systems/repositories/in-memory/in-memory-systems-repository'
import { ISystemsRepository } from '../../../systems/repositories/isystem-repository'
import { CreateSystem } from './create-system'
import { System } from '../../../systems/domain/system/system'

let systemsRepository: ISystemsRepository

describe('Create a System', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
  })

  it('should be able to create a system', async () => {
    const createSystem = new CreateSystem(systemsRepository)

    expect(
      createSystem.execute({
        name: "Iwantto",
        description: "description",
        updated_at: new Date(),
      }),
    ).resolves.toBeInstanceOf(System)
  })

})
