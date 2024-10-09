export interface ICreateLead {
  firstName: string
  middleName: string
  lastName: string
  email: string
  contactNumber: string
  documents: string[]
}
export interface IUpdateLead {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  contactNumber?: string
}

