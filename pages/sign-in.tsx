import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { string } from 'yup';

import { auth } from '../firebase/clientApp';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Transition } from '@headlessui/react';
import { InputField } from '../components/TextInput';
import { Button } from '../components/Button';

export default function SignInPage() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [formError, setFormError] = useState('');
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	/**
	 *
	 * Validate the email field.
	 * Checks that the email state is filled in and is a valid email address.
	 *
	 * @returns true | false
	 */
	const emailValidation = async () => {
		const emailSchema = string().email().required();

		try {
			await emailSchema.validate(email);
			setEmailError(''); // Clear the Error text
			return true;
		} catch (error: any) {
			setEmailError(error.message); // Set the error message
			return false;
		}
	};

	/**
	 *
	 * Validate the password field.
	 * Checks that the password state is filled in.
	 *
	 * @returns true | false
	 */
	const passwordValidation = async () => {
		const passwordSchema = string().required();

		try {
			await passwordSchema.validate(password);
			setPasswordError(''); // Clear the Error text
			return true;
		} catch (error: any) {
			setPasswordError(error.message); // Set the error message
			return false;
		}
	};

	/**
	 *
	 * Handle sign in.
	 * Validate the fields and log in using email and password
	 *
	 * @param event
	 */
	const handleSignIn = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent the default form action

		setLoading(true); // Set loading state

		// validate both fields
		const emailValid = await emailValidation();
		const passwordValid = await passwordValidation();

		// Set an error and stop if either field is not valid
		if (!emailValid || !passwordValid) {
			setFormError('Some fields were not filled in correctly'); // Set form error text
			setLoading(false); // reset loading state
			return;
		}

		// Log in with firebase, set an error if it goes wrong
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.replace('/');
		} catch (error) {
			setFormError('Unble to sign in, check your credentials and try again');
		}

		setLoading(false); // reset loading state

		return;
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
					<form onSubmit={handleSignIn} noValidate>
						<InputField
							value={email}
							name='userEmail'
							type='email'
							label='Email'
							disabled={loading}
							placeholder='name@domain.com'
							errorText={emailError}
							onBlur={emailValidation}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setEmailError('');
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
							errorText={passwordError}
							onBlur={passwordValidation}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setPasswordError('');
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
							show={formError ? true : false}
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
