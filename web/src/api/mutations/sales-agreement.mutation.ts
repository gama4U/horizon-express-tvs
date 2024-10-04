import { AxiosError } from "axios";
import { ICreateSalesAgreement, ISalesAgreement } from "../../interfaces/sales-agreement.interface";
import api from "../../utils/api.util";

export async function createSalesAgreement(data: ICreateSalesAgreement): Promise<ISalesAgreement & { message: string}> {
  try {
    const response = await api.post('/api/v1/sales-agreements', data);
    return response.data;
  } catch(error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong')
  }
}
