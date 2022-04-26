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
		<>
			<h1>Profile</h1>
			<h2>Welcome {user?.email}</h2>
			<button onClick={clickHandler} disabled={loading}>
				{loading ? 'Processing...' : 'Logout'}
			</button>
		</>
	);
}
