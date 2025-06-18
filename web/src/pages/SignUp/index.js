import RM from '@root/rm';
import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Input } from '@components/Form';
import { useAuthStore } from '@store/useAuthStore';
import AuthImagePattern from '@components/AuthImagePattern';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp = () => {
	const { signup, isSigningUp } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		// pre-checks before proceeding
		if (!data.fullName.trim()) return RM.toast.error('Full name is required');
		if (!data.email.trim()) return RM.toast.error('Email is required');
		if (!/\S+@\S+\.\S+/.test(data.email)) return RM.toast.error('Invalid email format');
		if (!data.password) return RM.toast.error('Password is required');
		if (data.password.length < 6) return RM.toast.error('Password must be at least 6 characters');

		signup(data);
	};

	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			{/* left side */}
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
								<MessageSquare className="size-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">Create Account</h1>
							<p className="text-base-content/60">Get started with your free account</p>
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<Input
							label="Full Name"
							name="fullName"
							placeholder="John Doe"
							icon={User}
							register={register}
							required
							error={errors.fullName?.message}
						/>
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
						<button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
							{isSigningUp ? (
								<>
									<Loader2 className="size-5 animate-spin" />
									Loading...
								</>
							) : (
								'Create Account'
							)}
						</button>
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Already have an account?{' '}
							<Link to="/login" className="link link-primary">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>

			{/* right side */}
			<AuthImagePattern
				title="Join our community"
				subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
			/>
		</div>
	);
};
export default SignUp;

const validationSchema = yup.object().shape({
	fullName: yup.string().required('Full name is required'),
	email: yup.string().email('Invalid email format').required('Email is required'),
	password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
// import { useState } from 'react';
// import { useAuthStore } from '@store/useAuthStore.js';
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import * as yup from 'yup';
// import AuthImagePattern from '@components/AuthImagePattern';
// import toast from 'react-hot-toast';
// import { FormProvider, useForm } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers/yup';

// const validationSchema = yup.object().shape({
// 	fullName: yup.string().required('Full name is required'),
// 	email: yup.string().email('Invalid email format').required('Email is required'),
// 	password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// const SignUp = () => {
// 	const { signup, isSigningUp } = useAuthStore();
// 	const [showPassword, setShowPassword] = useState(false);

// 	const formMethods = useForm({
// 		mode: 'onChange',
// 		// resolver: yupResolver(validationSchema),
// 		defaultValues: {
// 			fullName: '',
// 			email: '',
// 			password: '',
// 		},
// 	});

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = formMethods;

// 	const onSubmit = async (values) => {
// 		signup(values);
// 	};

// 	return (
// 		<div className="min-h-screen grid lg:grid-cols-2">
// 			{/* left side */}
// 			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
// 				<div className="w-full max-w-md space-y-8">
// 					{/* LOGO */}
// 					<div className="text-center mb-8">
// 						<div className="flex flex-col items-center gap-2 group">
// 							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
// 								<MessageSquare className="size-6 text-primary" />
// 							</div>
// 							<h1 className="text-2xl font-bold mt-2">Create Account</h1>
// 							<p className="text-base-content/60">Get started with your free account</p>
// 						</div>
// 					</div>
// 					<FormProvider {...formMethods}>
// 						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// 							<div className="form-control">
// 								<label className="label">
// 									<span className="label-text font-medium">Full Name</span>
// 								</label>
// 								<div className="relative">
// 									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// 										<User className="size-5 text-base-content/40" />
// 									</div>
// 									<input
// 										type="text"
// 										className={`input input-bordered w-full pl-10 ${errors.fullName ? 'input-error' : ''}`}
// 										placeholder="John Doe"
// 										{...register('fullName')}
// 									/>
// 								</div>
// 								{errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
// 							</div>

// 							<div className="form-control">
// 								<label className="label">
// 									<span className="label-text font-medium">Email</span>
// 								</label>
// 								<div className="relative">
// 									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// 										<Mail className="size-5 text-base-content/40" />
// 									</div>
// 									<input
// 										type="email"
// 										className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
// 										placeholder="you@example.com"
// 										{...register('email')}
// 									/>
// 								</div>
// 								{errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
// 							</div>

// 							<div className="form-control">
// 								<label className="label">
// 									<span className="label-text font-medium">Password</span>
// 								</label>
// 								<div className="relative">
// 									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// 										<Lock className="size-5 text-base-content/40" />
// 									</div>
// 									<input
// 										type={showPassword ? 'text' : 'password'}
// 										className={`input input-bordered w-full pl-10 ${errors.password ? 'input-error' : ''}`}
// 										placeholder="••••••••"
// 										{...register('password')}
// 									/>
// 									<button
// 										type="button"
// 										className="absolute inset-y-0 right-0 pr-3 flex items-center"
// 										onClick={() => setShowPassword(!showPassword)}>
// 										{showPassword ? (
// 											<EyeOff className="size-5 text-base-content/40" />
// 										) : (
// 											<Eye className="size-5 text-base-content/40" />
// 										)}
// 									</button>
// 								</div>
// 								{errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
// 							</div>

// 							<button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
// 								{isSigningUp ? (
// 									<>
// 										<Loader2 className="size-5 animate-spin" />
// 										Loading...
// 									</>
// 								) : (
// 									'Create Account'
// 								)}
// 							</button>
// 						</form>
// 					</FormProvider>

// 					<div className="text-center">
// 						<p className="text-base-content/60">
// 							Already have an account?{' '}
// 							<Link to="/login" className="link link-primary">
// 								Sign in
// 							</Link>
// 						</p>
// 					</div>
// 				</div>
// 			</div>

// 			{/* right panel */}

// 			<AuthImagePattern
// 				title="Join our community"
// 				subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
// 			/>
// 		</div>
// 	);
// };
// export default SignUp;

// import { useState } from 'react';
// import { useAuthStore } from '@store/useAuthStore';
// // import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
// import { Link } from 'react-router-dom';

// import AuthImagePattern from '@components/AuthImagePattern';
// import toast from 'react-hot-toast';
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';

// const SignUp = () => {
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [formData, setFormData] = useState({
// 		fullName: '',
// 		email: '',
// 		password: '',
// 	});

// 	const { signup, isSigningUp } = useAuthStore();
// 	const { register, handleSubmit } = useForm();

// 	const validateForm = () => {
// 		if (!formData.fullName.trim()) return toast.error('Full name is required');
// 		if (!formData.email.trim()) return toast.error('Email is required');
// 		if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format');
// 		if (!formData.password) return toast.error('Password is required');
// 		if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');

// 		return true;
// 	};

// 	const onSubmit = (e) => {
// 		e.preventDefault();

// 		const success = validateForm();

// 		if (success === true) signup(formData);
// 	};

// 	return (
// 		<div className="min-h-screen grid lg:grid-cols-2">
// 			{/* left side */}
// 			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
// 				<div className="w-full max-w-md space-y-8">
// 					{/* LOGO */}
// 					<div className="text-center mb-8">
// 						<div className="flex flex-col items-center gap-2 group">
// 							<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
// 								<MessageSquare className="size-6 text-primary" />
// 							</div>
// 							<h1 className="text-2xl font-bold mt-2">Create Account</h1>
// 							<p className="text-base-content/60">Get started with your free account</p>
// 						</div>
// 					</div>

// 					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// 						<div className="form-control">
// 							<label className="label">
// 								<span className="label-text font-medium">Full Name</span>
// 							</label>
// 							<div className="relative">
// 								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// 									<User className="size-5 text-base-content/40" />
// 								</div>
// 								<input
// 									type="text"
// 									className={`input input-bordered w-full pl-10`}
// 									placeholder="John Doe"
// 									value={formData.fullName}
// 									onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
// 								/>
// 							</div>
// 						</div>

// 						<div className="form-control">
// 							<label className="label">
// 								<span className="label-text font-medium">Email</span>
// 							</label>
// 							<div className="relative">
// 								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// 									<Mail className="size-5 text-base-content/40" />
// 								</div>
// 								<input
// 									type="email"
// 									className={`input input-bordered w-full pl-10`}
// 									placeholder="you@example.com"
// 									value={formData.email}
// 									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// 								/>
// 							</div>
// 						</div>

// 						<div className="form-control">
// 							<label className="label">
// 								<span className="label-text font-medium">Password</span>
// 							</label>
// 							<div className="relative">
// 								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// 									<Lock className="size-5 text-base-content/40" />
// 								</div>
// 								<input
// 									type={showPassword ? 'text' : 'password'}
// 									className={`input input-bordered w-full pl-10`}
// 									placeholder="••••••••"
// 									value={formData.password}
// 									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// 								/>
// 								<button
// 									type="button"
// 									className="absolute inset-y-0 right-0 pr-3 flex items-center"
// 									onClick={() => setShowPassword(!showPassword)}>
// 									{showPassword ? (
// 										<EyeOff className="size-5 text-base-content/40" />
// 									) : (
// 										<Eye className="size-5 text-base-content/40" />
// 									)}
// 								</button>
// 							</div>
// 						</div>

// 						<button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
// 							{isSigningUp ? (
// 								<>
// 									<Loader2 className="size-5 animate-spin" />
// 									Loading...
// 								</>
// 							) : (
// 								'Create Account'
// 							)}
// 						</button>
// 					</form>

// 					<div className="text-center">
// 						<p className="text-base-content/60">
// 							Already have an account?{' '}
// 							<Link to="/login" className="link link-primary">
// 								Sign in
// 							</Link>
// 						</p>
// 					</div>
// 				</div>
// 			</div>

// 			{/* right side */}

// 			<AuthImagePattern
// 				title="Join our community"
// 				subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
// 			/>
// 		</div>
// 	);
// };
// export default SignUp;
