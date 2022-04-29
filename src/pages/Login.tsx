import { useId, useRef } from 'react';
import type { FormEvent } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import ShowError from '../components/ShowError';

export default function Login() {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const { login, loading, error } = useAuth();
	const navigate = useNavigate();

	const emailID = useId();
	const passwordID = useId();

	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault();
		if (!email.current || !password.current) return;

		const { success } = await login(email.current.value, password.current.value);
		if (success) navigate('/profile');
	};

	return (
		<div className="h-full flex flex-col items-center justify-center px-4">
			<form
				className="bg-white grid gap-4 p-6 rounded w-full max-w-sm shadow-lg"
				onSubmit={onSubmitHandler}
			>
				<h1 className="text-center text-2xl font-medium py-2">Welcome Back 👋🏽</h1>

				<ShowError error={error} />

				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={emailID}>
						Email
					</label>
					<Input id={emailID} type="email" required={true} ref={email} />
				</div>
				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={passwordID}>
						Password
					</label>
					<Input id={passwordID} type="password" required={true} ref={password} />
				</div>
				<button
					className="px-4 py-2 border rounded border-gray-400 transition-all hover:border-gray-700 hover:ring-2 hover:ring-gray-700 text-gray-700 active:translate-y-1"
					type="submit"
					disabled={loading}
				>
					{loading ? 'Processing...' : 'Login'}
				</button>
			</form>
		</div>
	);
}
