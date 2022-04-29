import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Profile() {
	const { logout, loading, user } = useAuth();
	const navigate = useNavigate();

	const clickHandler = async () => {
		const { success } = await logout();
		if (success) navigate('/login');
	};

	return (
		<section className="h-full flex items-center justify-center flex-col gap-4">
			<h2 className="text-6xl text-center">
				Welcome <strong className="block">{user?.email} 👋</strong>
			</h2>
			<Button onClick={clickHandler}>{loading ? 'Processing...' : 'Logout'}</Button>
		</section>
	);
}
