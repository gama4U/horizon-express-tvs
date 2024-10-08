import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { IFetchTransaction, ITransaction } from "../../interfaces/transaction.interface";

export async function fetchTransaction({ id }: IFetchTransaction): Promise<ITransaction> {
	try {
		const response = await api.get(`/api/v1/transactions/${id}`);
		return response.data;
	} catch (error) {
		let message;
		if (error instanceof AxiosError) {
			message = error.response?.data.message;
		}
		throw new Error(message || 'Something went wrong');
	}
}
export interface IFetchTransactions {
	search?: string
	skip?: number
	take?: number
	travel?: boolean;
	accommodation?: boolean;
	tour?: boolean;
	transport?: boolean;
}
export interface ITransactions {
	transactions: ITransaction[],
	total: number
}
export async function fetchTransactions({ ...params }: IFetchTransactions): Promise<ITransactions> {
	try {
		const response = await api.get('/api/v1/transactions', {
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
