import { ISalesAgreement } from "./sales-agreement.interface";
import { IUser } from "./user.interface";

export interface ICreatedTransaction {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
}
export interface IHorizonOnlyFields {
  creator: IUser;
  salesAgreement: ISalesAgreement
}

