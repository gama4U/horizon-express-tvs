export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
  password?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserType {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface IUserSession {
  token: string;
  user: IUser
}

export interface IUserCredential {
  email: string;
  password: string
}

export interface IFetchUsers {
  skip?: number;
  take?: number;
  search?: string;
}

export interface IFetchUsersData {
  users: IUser[];
  total: number;
}
