import { IUser } from "./user.interface";

export interface ISalesAgreement {
  id: string;
  creatorId: string;
  clientName: string;
  typeOfClient: TypeOfClient;
  preparedBy: string;
  approvedBy: string;
  serialNumber: string;
  salesAgreementItems: ISalesAgreementItem[];
  purchaseOrder: any;
  transaction: any;
  creator: IUser;
  createdAt: Date;
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

export interface ISalesAgreementItem {
  id: string;
  salesAgreementId: string;
  particulars: string;
  quantity: number;
  unitPrice: number;
  total: number;
  salesAgreement?: ISalesAgreement;
  createdAt: Date;
  updatedAt: Date;
}