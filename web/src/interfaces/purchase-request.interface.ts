import { ISalesAgreement } from "./sales-agreement.interface";
import { IUser } from "./user.interface";

export interface IPurchaseRequestOrder {
  id: string;
  transactionId: string;
  creatorId: string;
  salesAgreementId: string;
  suppliersName: string;
  serialNumber: string;
  expenses: string;
  other: string;
  nos: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  purchaseOrderItems: any[];
  transaction?: any;
  creator?: IUser;
  salesAgreement?: ISalesAgreement;
  createdAt: Date;
  updatedAt: Date;
}

export enum PurchaseRequestOrderType {
  TICKET = 'TICKET',
  LOCAL_PACKAGE = 'LOCAL_PACKAGE',
  INTERNATIONAL_PACKAGE = 'INTERNATIONAL_PACKAGE',
  HOTEL = 'HOTEL',
  VISA = 'VISA'
}

export enum PaymentType {
  CASH = 'CASH',
  CHECK = 'CHECK'
}

export interface IFetchPurchaseRequestOrders {
  skip?: number;
  take?: number;
  search?: string;
}

export interface IFetchPurchaseRequestData {
  purchaseRequests: IPurchaseRequestOrder[];
  total: number;
}

export interface ICreatePurchaseRequest {
  suppliersName: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  expenses: string;
  nos: string;
  other?: string;
}

export interface IUpdatePurchaseRequest {
  purchaseRequestId: string;
  suppliersName: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  expenses: string;
  nos: string;
  other?: string;
}