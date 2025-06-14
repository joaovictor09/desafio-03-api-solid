import type { Organization } from '@/generated/prisma'
import type { OrganizationsRepository } from '@/repositories/organizations-repository'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

interface RegisterUseCaseRequest {
  address: string
  email: string
  name: string
  password: string
  phone: string
  responsible: string
  zip_code: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const { address, email, name, password, phone, responsible, zip_code } =
      data

    const organizationExists =
      await this.organizationRepository.findByEmail(email)

    if (organizationExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      address,
      email,
      name,
      password_hash: passwordHash,
      phone,
      responsible,
      zip_code,
    })

    return { organization }
  }
}
