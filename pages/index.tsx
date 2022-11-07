import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Connect</title>
				<meta name='description' content='A simple messaging app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<nav className='container mx-auto'>
				<span>navigation</span>
			</nav>
			<main className='container mx-auto'>
				<h1 className='text-5xl'>Connect</h1>
			</main>

			<footer className='container mx-auto'>
				<span>footer</span>
			</footer>
		</>
	);
}
