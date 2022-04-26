import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import type { ChangeEvent } from 'react';

export default function Login() {
	const { register, loading, error } = useAuth();

	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email.current || !password.current) return;

		const success = await register(email.current.value, password.current.value);
		if (success) navigate('/profile');
	};

	if (error) return <p>error...</p>;
	return (
		<>
			<form action="" onSubmit={onSubmitHandler}>
				<input ref={email} type="text" placeholder="email" />
				<br />
				<input ref={password} type="password" />
				<br />
				<button type="submit">{loading ? 'Processing...' : 'Register'}</button>
			</form>
		</>
	);
}
