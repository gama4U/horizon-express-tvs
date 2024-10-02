import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { ICreatedTransaction } from "../../interfaces/transaction.interface";

export async function createTransaction(): Promise<ICreatedTransaction> {
  try {
    const response = await api.post('/api/v1/transactions');
    return response.data;
  } catch(error) {
    let message;
    if(error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}
  