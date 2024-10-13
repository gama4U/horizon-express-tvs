import { ISalesAgreementItem } from "./sales-agreement-item.interface";
import { IUser } from "./user.interface";

export interface ISalesAgreement {
  id: string;
  creatorId: string;
  approverId: string;
  clientName: string;
  typeOfClient: TypeOfClient;
  preparedBy: string;
  approvedBy: string;
  serialNumber: string;
  salesAgreementItems: ISalesAgreementItem[];
  purchaseOrder: any;
  transaction: any;
  creator: IUser;
  approver: IUser;
  updatedAt: Date;
}

export enum TypeOfClient {
  WALK_IN = 'WALK_IN',
  CORPORATE = 'CORPORATE',
  GOVERNMENT = 'GOVERNMENT'
}

export interface ICreateSalesAgreement {
  clientName: string;
  serialNumber: string;
  typeOfClient: TypeOfClient;
  preparedBy?: string;
  approvedBy?: string;
}

export interface IUpdateSalesAgreement {
  salesAgreementId: string;
  clientName: string;
  serialNumber: string;
  typeOfClient: TypeOfClient;
  preparedBy?: string;
  approvedBy?: string;
}

export interface IFetchSalesAgreements {
  skip?: number;
  take?: number;
  search?: string;
  typeOfClient?: ClientTypeFilter;
}

export interface IFetchSalesAgreementsData {
  salesAgreements: ISalesAgreement[];
  total: number;
}

export type ClientTypeFilter = TypeOfClient | 'ALL';
