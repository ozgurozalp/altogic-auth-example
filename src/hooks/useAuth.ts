import altogic from '../lib/altogic';
import { useEffect, useState } from 'react';
import type { APIError, Session, User } from 'altogic/src/types';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
	const [user, setUser] = useState<User | null>(altogic.auth.getUser());
	const [session, setSession] = useState<Session | null>(altogic.auth.getSession());
	const [error, setError] = useState<APIError | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (
			error?.items.some(item =>
				['missing_session_token', 'invalid_session_token'].includes(item.code)
			)
		) {
			setUser(null);
			setSession(null);
			setError(null);
			setLoading(false);
			return navigate('/login');
		}
	}, [error]);

	async function register(email: string, password: string) {
		setLoading(true);
		setError(null);
		const { user, session, errors } = await altogic.auth.signUpWithEmail(email, password);
		setLoading(false);

		if (errors) {
			setError(errors);
			return { success: false };
		}

		setUser(user);
		setSession(session);

		return {
			success: true,
			isVerifyRequired: !session,
		};
	}

	async function login(email: string, password: string) {
		setLoading(true);
		setError(null);
		const { user, session, errors } = await altogic.auth.signInWithEmail(email, password);
		setLoading(false);

		if (errors) {
			setError(errors);
			return { success: false };
		}

		setUser(user);
		setSession(session);

		return { success: true };
	}

	async function changePassword(oldPassword: string, newPassword: string) {
		setError(null);
		const { errors } = await altogic.auth.changePassword(newPassword, oldPassword);

		if (errors) {
			setError(errors);
			return { success: false };
		}

		return { success: true };
	}

	async function logout(token?: string | undefined) {
		setError(null);
		if (token) {
			const { errors } = await altogic.auth.signOut(token);
			if (!errors) {
				return { success: true };
			}
		}

		const { errors } = await altogic.auth.signOut();

		if (errors) {
			setError(errors);
			return { success: false };
		}

		setUser(null);
		setError(null);
		setSession(null);
		return { success: true };
	}

	async function verifyToken() {
		const token = new URLSearchParams(window.location.href).get('access_token');
		if (!token) return;
		const { user, session, errors } = await altogic.auth.getAuthGrant(token);

		if (errors) {
			return navigate('/');
		}

		setUser(user);
		setSession(session);
		navigate('/profile');
	}

	async function getAllSessions() {
		const { sessions, errors } = await altogic.auth.getAllSessions();

		if (errors) {
			setError(errors);
			return {
				success: false,
				errors,
			};
		}

		return {
			success: true,
			sessions,
		};
	}

	return {
		user,
		session,
		error,
		loading,
		login,
		logout,
		register,
		changePassword,
		verifyToken,
		getAllSessions,
	};
}
