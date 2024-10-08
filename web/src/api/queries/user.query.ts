import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { IFetchUsers, IFetchUsersData } from "../../interfaces/user.interface";

export const fetchUsers = async (params: IFetchUsers): Promise<IFetchUsersData> => {
	try {
		const response = await api.get('/api/v1/users', { params });
		return response.data;
	} catch (error) {
		let message;
		if (error instanceof AxiosError) {
			message = error.response?.data.message;
		}
		throw new Error(message || 'Something went wrong')
	}
}
