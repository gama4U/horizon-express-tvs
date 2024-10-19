import { ClientType, OfficeBranch } from "@prisma/client"

export interface IClient {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  contactNumber: string
  documents: string[]
  officeBranch: OfficeBranch
}

export interface ICreateClient {
  firstName: string
  middleName: string
  lastName: string
  email: string
  contactNumber: string
  documents: string[]
  officeBranch: OfficeBranch
  clientType: ClientType
}
export interface IUpdateClient {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  contactNumber?: string
  officeBranch: OfficeBranch
}

