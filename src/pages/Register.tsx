import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ShowError from '../components/ShowError';
import Input from '../components/Input';

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

	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault();
		setPasswordError(null);
		if (!email.current || !password.current || !passwordConf.current) return;

		if (password.current.value !== passwordConf.current.value) {
			setPasswordError('Passwords do not match');
			return;
		}

		const { success, isVerifyRequired } = await register(
			email.current.value,
			password.current.value
		);

		if (isVerifyRequired) {
			email.current.value = password.current.value = passwordConf.current.value = '';
			return;
		}

		if (success) navigate('/profile');
	};

	return (
		<div className="h-full flex flex-col items-center justify-center px-4">
			<form
				className="bg-white grid gap-4 p-6 rounded w-full max-w-sm shadow-lg"
				onSubmit={onSubmitHandler}
			>
				<h1 className="text-center text-2xl font-medium py-2">Join to The Club 🥳</h1>

				<ShowError error={error} />

				{passwordError && (
					<div className="bg-red-500 text-white p-2">
						<p>{passwordError}</p>
					</div>
				)}

				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={emailID}>
						Email
					</label>
					<Input id={emailID} ref={email} type="email" required={true} />
				</div>
				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={passwordID}>
						Password
					</label>
					<Input id={passwordID} ref={password} type="password" required={true} />
				</div>
				<div className="input-group">
					<label className="block text-sm mb-1 text-gray-700" htmlFor={passwordConfID}>
						Password Confirmation
					</label>
					<Input id={passwordConfID} ref={passwordConf} type="password" required={true} />
				</div>
				<button
					className="px-4 py-2 border rounded border-gray-400 transition-all hover:border-gray-700 hover:ring-2 hover:ring-gray-700 text-gray-700 active:translate-y-1"
					type="submit"
					disabled={loading}
				>
					{loading ? 'Processing...' : 'Register'}
				</button>
			</form>
		</div>
	);
}
