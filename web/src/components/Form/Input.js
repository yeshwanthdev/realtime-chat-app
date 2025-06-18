import React from 'react';

const Input = React.forwardRef(
	(
		{
			label,
			name,
			register,
			required = false,
			error,
			type = 'text',
			placeholder = '',
			icon: Icon,
			rightIcon,
			className = '',
			...rest
		},
		ref
	) => (
		<div className="form-control">
			{label && (
				<label className="label">
					<span className="label-text font-medium">{label}</span>
				</label>
			)}
			<div className="relative">
				{Icon && (
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Icon className="size-5 text-base-content/40" />
					</div>
				)}
				<input
					ref={ref}
					name={name}
					type={type}
					placeholder={placeholder}
					className={`input input-bordered w-full ${Icon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${
						error ? 'input-error' : ''
					} ${className}`}
					{...(register ? register(name, { required }) : {})}
					{...rest}
				/>
				{rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightIcon}</div>}
			</div>
			{error && <p className="text-error text-xs mt-1">{error}</p>}
		</div>
	)
);

export default Input;
