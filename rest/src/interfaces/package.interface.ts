import { OfficeBranch } from "@prisma/client";

export interface IFindPackages {
  skip?: number;
  take?: number;
  search?: string;
  branch: OfficeBranch;
}