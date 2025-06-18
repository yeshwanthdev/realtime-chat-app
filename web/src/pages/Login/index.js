import { useState } from 'react';
import { useAuthStore } from '@store/useAuthStore';
import AuthImagePattern from '@components/AuthImagePattern';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { Input } from '@root/components/Form';
import { useForm } from 'react-hook-form';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { login, isLoggingIn } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		// pre-checks before proceeding
		if (!data.email.trim()) return RM.toast.error('Email is required');
		if (!/\S+@\S+\.\S+/.test(data.email)) return RM.toast.error('Invalid email format');
		if (!data.password) return RM.toast.error('Password is required');
		if (data.password.length < 6) return RM.toast.error('Password must be at least 6 characters');

		login(data);
	};

	return (
		<div className="h-screen grid lg:grid-cols-2">
			{/* Left Side - Form */}
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					{/* Logo */}
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
								<MessageSquare className="w-6 h-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
							<p className="text-base-content/60">Sign in to your account</p>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<Input
							label="Email"
							name="email"
							type="email"
							placeholder="you@example.com"
							icon={Mail}
							register={register}
							required
							error={errors.email?.message}
						/>
						<Input
							label="Password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••"
							icon={Lock}
							register={register}
							required
							error={errors.password?.message}
							autoComplete="new-password"
							// Show/hide password toggle
							rightIcon={
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() => setShowPassword((prev) => !prev)}
									tabIndex={-1}>
									{showPassword ? (
										<EyeOff className="size-5 text-base-content/40" />
									) : (
										<Eye className="size-5 text-base-content/40" />
									)}
								</button>
							}
						/>

						<button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
							{isLoggingIn ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									Loading...
								</>
							) : (
								'Sign in'
							)}
						</button>
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Don&apos;t have an account?{' '}
							<Link to="/signup" className="link link-primary">
								Create account
							</Link>
						</p>
					</div>
				</div>
			</div>

			{/* Right Side */}
			<AuthImagePattern
				title={'Welcome back!'}
				subtitle={'Sign in to continue your conversations and catch up with your messages.'}
			/>
		</div>
	);
};
export default Login;
