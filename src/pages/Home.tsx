import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

export default function Home() {
	const { user, logout, loading } = useAuth();
	const navigate = useNavigate();

	const clickHandler = async () => {
		const success = await logout();
		if (success) navigate('/login');
	};

	return (
		<div className="h-full flex flex-col gap-4 justify-center items-center bg-gray-100">
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
						<Link
							to="/login"
							className="px-4 py-2 rounded border bg-white transition-all hover:border-gray-500"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="px-4 py-2 rounded border bg-white transition-all hover:border-gray-500"
						>
							Register
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
