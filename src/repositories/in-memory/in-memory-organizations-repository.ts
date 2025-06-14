import type { Prisma, Organization } from '@/generated/prisma'
import type { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: data.id ?? randomUUID(),
      address: data.address,
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      phone: data.phone,
      responsible: data.responsible,
      zip_code: data.zip_code,
    } as Organization

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}
