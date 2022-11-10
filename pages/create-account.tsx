import Head from 'next/head';

export default function CreateAccountPage() {
	return (
		<>
			<Head>
				<title>Create account | Connect</title>
				<meta name='description' content='A simple messaging app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<nav className='container mx-auto'>
				<span>navigation</span>
			</nav>
			<main className='container mx-auto'>
				<h1 className='text-5xl'>Create account</h1>
			</main>

			<footer className='container mx-auto'>
				<span>footer</span>
			</footer>
		</>
	);
}
