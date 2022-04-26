import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useId, useRef } from 'react';

export default function Login() {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const { login, loading, error } = useAuth();
	const navigate = useNavigate();

	const emailID = useId();
	const passwordID = useId();

	useEffect(() => {
		email?.current?.focus();
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email.current || !password.current) return;

		const success = await login(email.current.value, password.current.value);
		if (success) navigate('/profile');
	};

	if (error) return <p>error...</p>;
	return (
		<div className="login-page h-full flex items-center justify-center px-4 bg-gray-100">
			<form
				className="bg-white grid gap-4 p-6 rounded w-full max-w-sm shadow-lg"
				onSubmit={onSubmitHandler}
			>
				<h1 className="text-center text-2xl font-medium py-2">Welcome Back 👋🏽</h1>
				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={emailID}>
						Email
					</label>
					<input
						className="rounded border-gray-400 outline-pink-600 focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
						id={emailID}
						ref={email}
						type="email"
						required={true}
					/>
				</div>
				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={passwordID}>
						Password
					</label>
					<input
						className="rounded border-gray-400 outline-pink-600 focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
						id={passwordID}
						ref={password}
						type="password"
						required={true}
					/>
				</div>
				<button
					className="px-4 py-2 border rounded border-gray-400 outline-pink-600 transition-all hover:border-gray-700 hover:ring-2 hover:ring-gray-700 text-gray-700 active:translate-y-1"
					type="submit"
					disabled={loading}
				>
					{loading ? 'Processing...' : 'Login'}
				</button>
			</form>
		</div>
	);
}
