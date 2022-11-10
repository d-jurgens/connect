import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Eye, EyeSlash } from 'phosphor-react';

const InputField = (props: {
	name: string;
	type: 'email' | 'password' | 'text';
	label: string;
	placeholder?: string;
	value: any;
	onChange?: any;
	onBlur?: any;
	disabled?: boolean;
	errorText?: string | null;
}) => {
	const [inputType, setInputType] = useState(props.type);

	return (
		<div className='mb-5 relative'>
			<label
				htmlFor={props.name}
				className={`block text-sm transition-colors ${
					props.errorText && 'text-red-700'
				}`}
			>
				{props.label}
			</label>
			<input
				value={props.value}
				type={inputType}
				id={props.name}
				name={props.name}
				disabled={props.disabled}
				placeholder={props.placeholder}
				onChange={props.onChange}
				onBlur={props.onBlur}
				className={`border w-full rounded-md outline-0 py-1 px-2 transition-colors ${
					props.errorText
						? 'border-red-700 focus:ring-1 focus:ring-red-700'
						: 'border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600'
				}
                    ${props.disabled && 'hover:cursor-not-allowed'}
                ${props.type === 'password' && 'pr-8'}`}
			/>
			{props.type === 'password' && (
				<>
					{inputType === 'password' && (
						<Eye
							size='18'
							className='absolute top-7 right-3 hover:cursor-pointer'
							onClick={() => {
								setInputType('text');
							}}
						/>
					)}

					{inputType === 'text' && (
						<EyeSlash
							size='18'
							className='absolute top-7 right-3 hover:cursor-pointer'
							onClick={() => {
								setInputType('password');
							}}
						/>
					)}
				</>
			)}

			<Transition
				show={props.errorText ? true : false}
				enter='transition-opacity duration-75'
				enterFrom='opacity-0'
				enterTo='opacity-100'
				leave='transition-opacity duration-150'
				leaveFrom='opacity-100'
				leaveTo='opacity-0'
			>
				<p className='text-xs text-red-700 absolute'>{props.errorText}</p>
			</Transition>
		</div>
	);
};

export { InputField };
