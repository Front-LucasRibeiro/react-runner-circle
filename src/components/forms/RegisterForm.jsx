import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

function RegisterForm({ onNavigateToLogin }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (field) => (e) => {
		setFormData((prev) => ({
			...prev,
			[field]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		
		// Validar se as senhas coincidem
		if (formData.password !== formData.confirmPassword) {
			setError('As senhas não coincidem');
			return;
		}

		// Validar se a senha tem pelo menos 6 caracteres
		if (formData.password.length < 6) {
			setError('A senha deve ter pelo menos 6 caracteres');
			return;
		}

		setLoading(true);

		try {
			const response = await fetch('http://localhost:3001/user', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					username: '',
					email: formData.email,
					password: formData.password,
					phone: '',
					city: '',
					state: '',
					bio: ''
				})
			});

			if (!response.ok) {
				throw new Error('Erro ao criar conta');
			}

			console.log('Account created successfully:', formData);
			// Navegar para o login após sucesso
			onNavigateToLogin?.();
		} catch (err) {
			console.error('Registration error:', err);
			setError('Erro ao criar conta. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className='w-full max-w-sm'>
			<h1 className='text-xl font-bold text-brand-graphite mb-2'>CRIAR CONTA</h1>
			<p className='text-sm text-brand-gray-light mb-4'>Crie sua conta para começar a correr!</p>

			<form onSubmit={handleSubmit} className='space-y-4'>
				{error && (
					<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm'>
						{error}
					</div>
				)}

				<Input
					label='Nome completo'
					type='text'
					placeholder='Seu nome completo'
					value={formData.name}
					onChange={handleChange('name')}
					required
				/>

				<Input
					label='Email'
					type='email'
					placeholder='usuario123@hotmail.com'
					value={formData.email}
					onChange={handleChange('email')}
					required
				/>

				<Input
					label='Senha'
					type='password'
					placeholder='••••••••'
					value={formData.password}
					onChange={handleChange('password')}
					required
				/>

				<Input
					label='Confirmar senha'
					type='password'
					placeholder='••••••••'
					value={formData.confirmPassword}
					onChange={handleChange('confirmPassword')}
					required
				/>

				<Button type='submit' disabled={loading}>
					{loading ? 'Criando conta...' : 'Criar conta'}
					{!loading && (
						<svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
						</svg>
					)}
				</Button>
			</form>

			<p className='mt-4 text-center text-xs text-brand-gray-light'>
				Já tem uma conta?{' '}
				<button
					onClick={onNavigateToLogin}
					className='text-brand-graphite font-semibold hover:underline'
				>
					Faça login! 🏃‍♂️
				</button>
			</p>
		</Card>
	);
}

export default RegisterForm;
