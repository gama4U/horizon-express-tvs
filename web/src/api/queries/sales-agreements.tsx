import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { IFetchSalesAgreements, IFetchSalesAgreementsData } from "../../interfaces/sales-agreement.interface";

export async function fetchSalesAgreements(params: IFetchSalesAgreements): Promise<IFetchSalesAgreementsData> {
  try {
    const response = await api.get('/api/v1/sales-agreements', {params});
    return response.data;
  } catch(error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}
