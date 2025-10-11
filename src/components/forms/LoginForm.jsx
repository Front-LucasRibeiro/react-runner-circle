import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';

function LoginForm({ onNavigateToRegister, onNavigateToFeed }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('http://localhost:3001/user');
			if (!response.ok) {
				throw new Error('Erro ao conectar com o servidor');
			}

			const userData = await response.json();
			
			if (userData.email === email && userData.password === password) {
				console.log('Login successful:', { email, rememberMe });
				onNavigateToFeed?.();
			} else {
				setError('Email ou senha incorretos. Tente novamente.');
			}
		} catch (err) {
			console.error('Login error:', err);
			setError('Erro ao fazer login. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className='w-full max-w-xs'>
			<h1 className='text-xl font-bold text-brand-graphite mb-2'>LOGIN</h1>
			<p className='text-sm text-brand-gray-light mb-4'>Boas-vindas! Faça seu login.</p>

			<form onSubmit={handleSubmit} className='space-y-4'>
				{error && (
					<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm'>
						{error}
					</div>
				)}

				<Input
					label='Email'
					type='email'
					placeholder='usuario123@hotmail.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<Input
					label='Senha'
					type='password'
					placeholder='••••••'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<Checkbox
					label='Lembrar-me'
					checked={rememberMe}
					onChange={(e) => setRememberMe(e.target.checked)}
				/>

				<Button type='submit' disabled={loading}>
					{loading ? 'Entrando...' : 'Login'}
					{!loading && (
						<svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
						</svg>
					)}
				</Button>
			</form>

			<p className='mt-4 text-center text-xs text-brand-gray-light'>
				Ainda não tem conta?{' '}
				<button
					onClick={onNavigateToRegister}
					className='text-brand-graphite font-semibold hover:underline'
				>
					Crie seu cadastro! 📱
				</button>
			</p>
		</Card>
	);
}

export default LoginForm;
