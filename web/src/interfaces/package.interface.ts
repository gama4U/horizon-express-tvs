import { Currency } from "./sales-agreement-item.interface";
import { IUser } from "./user.interface";

export interface IPackage {
  id: string;
  creatorId: string;
  approverId: string;
  packageNumber: string;
  name: string;
  inclusions: string[];
  exclusions: string[];
  remarks: string;
  accommodation?: IPackageAccommodation;
  airfare?: IPackageAirfare;
  creator?: IUser;
  approver?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFetchPackages {
  skip?: number;
  take?: number;
  search?: string;
  userType?: string;
  branch?: string;
}

export interface IFetchPackagesData {
  packages: IPackage[];
  total: number;
}

export interface IPackageAccommodation {
  id: string;
  packageId: string;
  category: string;
  options: string[];
  ratePerPerson: number;
  currency: Currency;
  package?: IPackage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPackageAirfare {
  id: string;
  packageId: string;
  airline: string;
  flightDetails: string;
  package: IPackage;
  createdAt: Date;
  updateAt: Date;
}
