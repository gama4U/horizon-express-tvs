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
