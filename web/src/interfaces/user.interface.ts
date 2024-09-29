export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserType {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}