const InputField = (props: {
	name: string;
	type: 'email' | 'password' | 'text';
	label: string;
	errorText?: string;
}) => {
	return (
		<div className='mb-4'>
			<label
				htmlFor={props.name}
				className={`block text-sm font-bold ${
					props.errorText && 'text-red-700'
				}`}
			>
				{props.label}
			</label>
			<input
				type={props.type}
				id={props.name}
				name={props.name}
				className={`border w-full rounded-md outline-0 py-1 px-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${
					props.errorText ? 'border-red-700' : 'border-gray-300'
				}`}
			/>
			{props.errorText && (
				<span className='text-sm text-red-700'>{props.errorText}</span>
			)}
		</div>
	);
};

export { InputField };
