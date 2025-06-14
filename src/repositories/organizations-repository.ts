import type { Organization, Prisma } from '@/generated/prisma'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
}
