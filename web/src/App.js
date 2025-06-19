import RM from '@root/rm';
import HomePage from '@pages/Home';
import SignUpPage from '@pages/SignUp';
import LoginPage from '@pages/Login';
import SettingsPage from '@pages/Settings';
import ProfilePage from '@pages/Profile';
import NavBar from '@components/NavBar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

const App = () => {
	const { authUser } = useAuthStore();
	const { theme } = useThemeStore();

	return (
		<BrowserRouter>
			<div data-theme={theme}>
				<NavBar />
				<Routes>
					<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
					<Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
					<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
					<Route path="/settings" element={<SettingsPage />} />
					<Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
				</Routes>
				<Toaster />
			</div>
		</BrowserRouter>
	);
};

export default App;
