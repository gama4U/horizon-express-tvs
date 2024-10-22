import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { ITransaction } from "@/interfaces/transaction.interface";
import { OfficeBranch } from "@/interfaces/user.interface";
import { ISalesAgreement } from "@/interfaces/sales-agreement.interface";

export interface ICreateClient {
  name?: string
  email?: string
  contactNumber?: string
  clientType: TypeOfClient
  documents?: string[]
  department?: string
  officeBranch?: OfficeBranch;
  notes?: string;
}
export interface IUpdateClient {
  id: string
  name?: string
  email?: string
  contactNumber?: string
  documents?: string[]
  department?: string
  officeBranch?: OfficeBranch
  notes?: string;
}

export enum TypeOfClient {
  WALK_IN = 'WALK_IN',
  CORPORATE = 'CORPORATE',
  GOVERNMENT = 'GOVERNMENT',
  GROUP = 'GROUP',
  INDIVIDUAL = 'INDIVIDUAL'
}

export interface IClient {
  id: string
  name?: string
  email?: string
  contactNumber?: string
  documents?: string[]
  department?: string
  officeBranch?: OfficeBranch
  salesAgreements?: ISalesAgreement[]
  transactions?: ITransaction[]
  clientType: TypeOfClient
}

export async function createClient(data: ICreateClient): Promise<IClient> {
  try {
    const response = await api.post('/api/v1/clients', data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function updateClient({ id, ...data }: IUpdateClient) {
  try {
    const response = await api.put(`/api/v1/clients/${id}`, data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function deleteClient(id: string) {
  try {
    const response = await api.delete(`/api/v1/clients/${id}`);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}


