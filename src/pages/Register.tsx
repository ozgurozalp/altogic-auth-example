import {useEffect, useId, useRef, useState} from 'react';
import type { FormEvent } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const passwordConf = useRef<HTMLInputElement>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const { register, loading, error } = useAuth();
	const navigate = useNavigate();

	const emailID = useId();
	const passwordID = useId();
	const passwordConfID = useId();

	useEffect(() => {
		email?.current?.focus();
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault();
		setPasswordError(null);
		if (!email.current || !password.current || !passwordConf.current) return;

		if (password.current.value !== passwordConf.current.value) {
			setPasswordError('Passwords do not match');
			return;
		}

		const success = await register(email.current.value, password.current.value);
		if (success) navigate('/profile');
	};


	return (
		<div className="h-full flex flex-col items-center justify-center px-4 bg-gray-100">
			<form
				className="bg-white grid gap-4 p-6 rounded w-full max-w-sm shadow-lg"
				onSubmit={onSubmitHandler}
			>
				<h1 className="text-center text-2xl font-medium py-2">Join to The Club 🥳</h1>
				{
					error && (
						<div className="bg-red-500 text-white p-2">
							{error.items.map((e, index) => (<p key={index}>{e.message}</p>))}
						</div>
					)
				}
				{
					passwordError && (
						<div className="bg-red-500 text-white p-2">
							<p>{passwordError}</p>
						</div>
					)
				}

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
				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={passwordConfID}>
						Password Confirmation
					</label>
					<input
						className="rounded border-gray-400 outline-pink-600 focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
						id={passwordConfID}
						ref={passwordConf}
						type="password"
						required={true}
					/>
				</div>
				<button
					className="px-4 py-2 border rounded border-gray-400 outline-pink-600 transition-all hover:border-gray-700 hover:ring-2 hover:ring-gray-700 text-gray-700 active:translate-y-1"
					type="submit"
					disabled={loading}
				>
					{loading ? 'Processing...' : 'Register'}
				</button>
			</form>
		</div>
	);
}
