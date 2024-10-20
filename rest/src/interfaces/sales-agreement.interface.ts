import { ClientType, Currency } from "@prisma/client";

export interface ICreateSalesAgreement {
  creatorId: string;
  clientId: string;
  serialNumber: string;
  currency: Currency;
  serviceFee?: number;
}

export interface IUpdateSalesAgreement {
  id: string;
  clientId: string;
  serialNumber: string;
  currency: Currency;
  serviceFee?: number;
}

export interface IFindSalesAgreements {
  skip?: number;
  take?: number;
  search?: string;
  typeOfClient?: ClientType;
}

export interface IUpdateSalesAgreementApprover {
  id: string;
  approverId: string;
}
