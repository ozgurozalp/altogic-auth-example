import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
	const { logout, loading, user } = useAuth();
	const navigate = useNavigate();

	const clickHandler = async () => {
		const success = await logout();
		if (success) navigate('/login');
	};

	return (
		<section className="h-full flex items-center justify-center flex-col gap-4 bg-gray-100">
			<h2 className="text-6xl text-center">Welcome <strong className="block">{user?.email}  👋</strong></h2>
			<button className="px-4 py-2 rounded border bg-white transition-all hover:border-gray-500" onClick={clickHandler} disabled={loading}>
				{loading ? 'Processing...' : 'Logout'}
			</button>
		</section>
	);
}
