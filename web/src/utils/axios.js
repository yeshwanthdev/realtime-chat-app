import RM from '@root/rm';
import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: RM.commonConfig.apiBaseUrl,
	withCredentials: true,
});
