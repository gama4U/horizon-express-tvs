import { ISupplier } from "@/api/mutations/supplier.mutation";
import { IPurchaseRequestOrderItem } from "./purchase-request-item.interface";
import { ISalesAgreement } from "./sales-agreement.interface";
import { IUser } from "./user.interface";

export interface IPurchaseRequestOrder {
  id: string;
  creatorId: string;
  approverId: string;
  salesAgreementId: string;
  supplierId: string;
  serialNumber: string;
  expenses: string;
  other: string;
  nos: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  purchaseOrderItems: IPurchaseRequestOrderItem[],
  transaction?: any;
  creator?: IUser;
  approver?: IUser;
  salesAgreement?: ISalesAgreement;
  supplier?: ISupplier;
  createdAt: Date;
  updatedAt: Date;
}

export enum PurchaseRequestOrderType {
  ACCOMMODATION = "ACCOMMODATION",
  DOMESTIC_AIRLINE_TICKETING = "DOMESTIC_AIRLINE_TICKETING",
  SHIPPING = "SHIPPING",
  INTERNATIONAL_AIRLINE_TICKETING = "INTERNATIONAL_AIRLINE_TICKETING",
  TRANSPORTATION_RENTAL = "TRANSPORTATION_RENTAL",
  VISA = "VISA"
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
  supplierId: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  expenses: string;
  nos: string;
  other?: string;
}

export interface IUpdatePurchaseRequest {
  purchaseRequestId: string;
  supplierId: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  expenses: string;
  nos: string;
  other?: string;
}
