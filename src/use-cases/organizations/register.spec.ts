import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import type { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

let organizationRepository: OrganizationsRepository
let sut: RegisterUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationRepository)
  })

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      name: 'Organization',
      address: 'Street 01',
      email: 'contact@acme.com',
      password: '123456',
      phone: '11999999999',
      responsible: 'Responsible',
      zip_code: '11111111',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        name: 'Organization',
      }),
    )
  })

  it('should not be able to register two organizations with the same email', async () => {
    await sut.execute({
      name: 'Organization',
      address: 'Street 01',
      email: 'contact@acme.com',
      password: '123456',
      phone: '11999999999',
      responsible: 'Responsible',
      zip_code: '11111111',
    })

    await expect(() =>
      sut.execute({
        name: 'Organization',
        address: 'Street 01',
        email: 'contact@acme.com',
        password: '123456',
        phone: '11999999999',
        responsible: 'Responsible',
        zip_code: '11111111',
      }),
    ).rejects.instanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash the organization password', async () => {
    const password = '123456'

    const { organization } = await sut.execute({
      name: 'Organization',
      address: 'Street 01',
      email: 'contact@acme.com',
      password,
      phone: '11999999999',
      responsible: 'Responsible',
      zip_code: '11111111',
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
