import { IUser } from "./user.interface";

export interface SessionData {
  token: string | null; 
  user: IUser | null;
}

export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
