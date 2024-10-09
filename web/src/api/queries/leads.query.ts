import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { ILead } from "../mutations/lead.mutation";

interface IFetchLeads {
  skip?: number;
  take?: number;
  search?: string;
}

interface ILeads {
  leadsData: ILead[]
  total: number
}
export async function fetchLeads({ ...params }: IFetchLeads): Promise<ILeads> {
  try {
    const response = await api.get('/api/v1/leads', {
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


