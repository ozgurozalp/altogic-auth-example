import { format } from 'date-fns';
import useAuth from '../hooks/useAuth';
import Button from './Button';
import { useEffect, useMemo, useState } from 'react';
import type { Session } from 'altogic';

interface ActiveSessionsProps {
	className?: string;
}

export default function ActiveSessions({ className }: ActiveSessionsProps) {
	const [sessions, setSessions] = useState<Session[] | null>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const { getAllSessions, logout, session } = useAuth();

	useEffect(() => {
		setLoading(true);
		getAllSessions().then(res => {
			if (res.errors) return;
			if (res.success) setSessions(res.sessions);
			setLoading(false);
		});
	}, []);

	const _sessions = useMemo(() => {
		if (!sessions) return [];
		return sessions?.filter(_session => _session.token !== session?.token);
	}, [sessions]);

	const clickHandle = async (token: string | undefined) => {
		const { success } = await logout(token);
		const leftSessions = sessions?.filter(session => session.token !== token) as Session[];
		if (success) setSessions(leftSessions);
	};

	if (!sessions) return null;
	return (
		<div className={`bg-white grid gap-4 ${className ?? ''}`}>
			{loading ? (
				<h2 className="text-center text-xl font-medium py-2">Loading...</h2>
			) : (
				<>
					<h2 className="text-center text-xl font-medium py-2">All Sessions</h2>
					{_sessions?.length > 0 ? (
						_sessions?.map(session => (
							<div
								key={session.token}
								className="flex items-center justify-between border p-4"
							>
								<div>
									<div>
										Device: <strong>{session.userAgent.family}</strong>
									</div>
									<time className="text-gray-600 text-xs">
										{format(
											new Date(session.creationDtm),
											'yyyy-MM-dd HH:mm:ss'
										)}
									</time>
								</div>
								<Button onClick={() => clickHandle(session.token)}>
									Logout from this
								</Button>
							</div>
						))
					) : (
						<span className="text-gray-600 text-center text-xs">No session found</span>
					)}
				</>
			)}
		</div>
	);
}
