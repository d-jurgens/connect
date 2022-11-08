import Head from 'next/head';
import React, { useState } from 'react';
import { string } from 'yup';

import { Transition } from '@headlessui/react';
import { InputField } from '../components/TextInput';
import { Button } from '../components/Button';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [emailHasError, setEmailHasError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(null);
	const [passwordHasError, setPasswordHasError] = useState(false);
	const [formError, setFormError] = useState('');
	const [formHasError, setFormHasError] = useState(false);
	const [loading, setLoading] = useState(false);

	const emailValidation = async () => {
		const emailSchema = string().email().required();

		try {
			await emailSchema.validate(email);
			setEmailHasError(false);
			setEmailError(null);
			return true;
		} catch (error: any) {
			setEmailHasError(true);
			setEmailError(error.message);
			return false;
		}
	};

	const passwordValidation = async () => {
		const passwordSchema = string().required();

		try {
			await passwordSchema.validate(password);
			setPasswordHasError(false);
			setPasswordError(null);
			return true;
		} catch (error: any) {
			setPasswordHasError(true);
			setPasswordError(error.message);
			return false;
		}
	};

	const handleSignIn = async (event: React.FormEvent) => {
		event.preventDefault();

		setLoading(true);

		const target = event.target as typeof event.target & {
			userEmail: { value: string };
			userPassword: { value: string };
		};

		// validate both fields
		const emailValid = await emailValidation();
		const passwordValid = await passwordValidation();

		if (emailValid && passwordValid) {
			setFormHasError(false);
			setFormError('');
			console.log('Email: ' + target.userEmail.value);
			console.log('Password: ' + target.userPassword.value);
			setLoading(false);
		} else {
			setFormHasError(true);
			setFormError('Some fields were not filled in correctly');
			setLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Sign in | connect</title>
				<meta name='description' content='Sign in to the app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='container mx-auto min-h-screen flex flex-col justify-center'>
				<h1 className='mb-4 text-5xl text-center'>Sign in</h1>
				<div className='max-w-lg w-[25rem] p-6 rounded-lg mx-auto shadow-lg bg-white'>
					<form onSubmit={handleSignIn}>
						<InputField
							value={email}
							name='userEmail'
							type='email'
							label='Email'
							disabled={loading}
							placeholder='name@domain.com'
							hasError={emailHasError}
							errorText={emailError}
							onBlur={emailValidation}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setEmailError(null);
								setFormHasError(false);
								setFormError('');
								setEmail(e.target.value);
							}}
						/>
						<InputField
							value={password}
							name='userPassword'
							type='password'
							label='Password'
							disabled={loading}
							hasError={passwordHasError}
							errorText={passwordError}
							onBlur={passwordValidation}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setPasswordError(null);
								setFormHasError(false);
								setFormError('');
								setPassword(e.target.value);
							}}
						/>
						{/* TODO: reset password feature */}
						<p className='text-sm mb-4'>Forgot your password? Reset it here.</p>
						<Button type='submit' loading={loading}>
							Sign in
						</Button>
						<Transition
							show={formHasError}
							enter='transition-opacity duration-75'
							enterFrom='opacity-0 h-0'
							enterTo='opacity-100 h-full'
							leave='transition-opacity duration-150'
							leaveFrom='opacity-100 h-full'
							leaveTo='opacity-0 h-0'
						>
							<p className='mt-4 p-3 bg-slate-100 text-red-700 text-sm border-l-4 border-l-red-700'>
								{formError}
							</p>
						</Transition>
					</form>
				</div>
			</main>
		</>
	);
}
