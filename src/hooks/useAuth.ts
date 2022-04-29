import altogic from '../lib/altogic';
import { useState } from 'react';
import type { APIError, Session, User } from 'altogic/src/types';

export default function useAuth() {
	const [user, setUser] = useState<User | null>(altogic.auth.getUser());
	const [session, setSession] = useState<Session | null>(altogic.auth.getSession());
	const [error, setError] = useState<APIError | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

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
		setLoading(true);
		setError(null);
		const { errors } = await altogic.auth.changePassword(newPassword, oldPassword);
		setLoading(false);

		if (errors) {
			setError(errors);
			return { success: false };
		}

		return { success: true };
	}

	async function logout() {
		setLoading(true);
		setError(null);
		const { errors } = await altogic.auth.signOut();
		setLoading(false);

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
			setError(errors);
			return (window.location.href = '/');
		}

		setUser(user);
		setSession(session);
		window.location.href = '/profile';
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
	};
}
