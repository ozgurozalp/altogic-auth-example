import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';

export default function Profile() {
	const { logout, loading, user } = useAuth();
	const navigate = useNavigate();

	const clickHandler = async () => {
		const { success } = await logout();
		if (success) navigate('/login');
	};

	return (
		<Container className="p-4 flex justify-center items-center h-full">
			<Card className="flex flex-col">
				<h2 className="text-base sm:text-2xl md:text-4xl text-center">
					Welcome <strong className="block">{user?.email} 👋</strong>
				</h2>
				<Button className="mt-4 self-center" onClick={clickHandler}>
					{loading ? 'Processing...' : 'Logout'}
				</Button>
			</Card>
		</Container>
	);
}
