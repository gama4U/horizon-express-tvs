import { UserType } from "@prisma/client";

export interface IGetUsers {
  skip?: number;
  take?: number;
  search?: string;
  userType?: UserType;
}

export interface IUpdateUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType?: UserType;
  password?: string;
}
