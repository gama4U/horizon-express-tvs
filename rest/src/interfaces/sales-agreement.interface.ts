import { ClientType, Currency } from "@prisma/client";

export interface ICreateSalesAgreement {
  creatorId: string;
  typeOfClient: ClientType;
  clientName: string;
  serialNumber: string;
  currency: Currency;
}

export interface IUpdateSalesAgreement {
  id: string;
  creatorId: string;
  typeOfClient: ClientType;
  clientName: string;
  serialNumber: string;
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
