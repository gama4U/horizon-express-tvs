import { UserType } from "@prisma/client";

export interface IFindUsers {
  skip?: number;
  take?: number;
  search?: string;
  type?: UserType;
}

export interface IUpdateUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType?: UserType;
  password?: string;
}

export interface IUpdateUserAvatar {
  id: string;
  avatar: string;
}

export interface IUpdateUserPassword {
  id: string;
  password: string;
}
