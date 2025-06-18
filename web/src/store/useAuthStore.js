import { create } from 'zustand';
import { axiosInstance } from '@utils/axios.js';
import RM from '@root/rm';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const response = await axiosInstance.get('/auth/check');

			set({ authUser: response.data });
		} catch (error) {
			console.log('Error in checkAuth:', error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });
		try {
			const response = await axiosInstance.post('/auth/signup', data);
			set({ authUser: response.data });
			RM.toast.success('Account created successfully');
		} catch (error) {
			RM.toast.error(error.response.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true });
		try {
			const response = await axiosInstance.post('/auth/login', data);
			set({ authUser: response.data });
			RM.toast.success('Logged in successfully');
		} catch (error) {
			RM.toast.error(error.response.data.message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post('/auth/logout');
			set({ authUser: null });
			RM.toast.success('Logged out successfully');
		} catch (error) {
			RM.toast.error(error.response.data.message);
		}
	},
}));
