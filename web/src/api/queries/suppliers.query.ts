import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { ISupplier } from "../mutations/supplier.mutation";

interface IFetchSuppliers {
  skip?: number;
  take?: number;
  search?: string;
  branch?: string;
  isApproved?: boolean;
  // category?: string;
}

interface ISuppliers {
  suppliersData: ISupplier[]
  total: number
}
export async function fetchSuppliers({ ...params }: IFetchSuppliers): Promise<ISuppliers> {
  try {
    const response = await api.get('/api/v1/suppliers', {
      params: {
        ...params,
      }
    });
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}


