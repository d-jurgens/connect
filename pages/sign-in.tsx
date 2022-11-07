import Head from 'next/head';

import { InputField } from '../components/TextInput';

type FormEvent = React.FormEvent;

export default function SignIn() {
	const handleSignIn = async (event: FormEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			userEmail: { value: string };
			userPassword: { value: string };
		};
		console.log('Email: ' + target.userEmail.value);
		console.log('Password: ' + target.userPassword.value);
	};

	return (
		<>
			<Head>
				<title>Sign in | connect</title>
				<meta name='description' content='Sign in to the app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<nav className='container mx-auto'>
				<span>navigation</span>
			</nav>
			<main className='container mx-auto'>
				<h1 className='text-5xl'>Sign in</h1>
				<form onSubmit={handleSignIn}>
					<InputField name='userEmail' type='email' label='Email' />
					<InputField
						name='userPassword'
						type='password'
						label='Password'
						errorText='Invalid password'
					/>
					<button type='submit'>Submit</button>
				</form>
			</main>

			<footer className='container mx-auto'>
				<span>footer</span>
			</footer>
		</>
	);
}
