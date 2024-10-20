import { ClientType, Currency } from "@prisma/client";

export interface ICreateSalesAgreement {
  creatorId: string;
  serialNumber: string;
  currency: Currency;
  clientId: string;
}

export interface IUpdateSalesAgreement {
  id: string;
  clientId: string;
  serialNumber: string;
  currency: Currency;
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
