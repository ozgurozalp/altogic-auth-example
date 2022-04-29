import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

export default function Home() {
	const { user, logout, loading } = useAuth();
	const navigate = useNavigate();

	const clickHandler = async () => {
		const { success } = await logout();
		if (success) navigate('/login');
	};

	return (
		<div className="h-full flex flex-col gap-4 justify-center items-center">
			<h1 className="text-5xl text-center">Welcome to Altogic Auth Sample</h1>
			<div className="flex gap-2">
				{user ? (
					<>
						<Button renderAs="a" to="/profile">
							Profile
						</Button>
						<Button onClick={clickHandler}>
							{loading ? 'Processing...' : 'Logout'}
						</Button>
					</>
				) : (
					<>
						<Button renderAs="a" to="/login">
							Login
						</Button>
						<Button renderAs="a" to="/register">
							Register
						</Button>
					</>
				)}
			</div>
		</div>
	);
}
