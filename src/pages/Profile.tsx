import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import PasswordUpdate from '../components/PasswordUpdate';
import ActiveSessions from '../components/ActiveSessions';

export default function Profile() {
	const { logout, loading, user } = useAuth();
	const navigate = useNavigate();

	const clickHandler = async () => {
		const { success } = await logout();
		if (success) navigate('/login');
	};

	return (
		<Container className="p-4 grid items-baseline profile gap-4">
			<Card className="flex flex-col welcome">
				<h2 className="text-base sm:text-2xl md:text-4xl text-center">
					Welcome <strong className="block">{user?.email} 👋</strong>
				</h2>
				<Button className="mt-4 self-center" onClick={clickHandler}>
					{loading ? 'Processing...' : 'Logout'}
				</Button>
			</Card>
			<Card className="w-full passwordChange">
				<PasswordUpdate />
			</Card>
			<Card className="w-full allSessions">
				<ActiveSessions />
			</Card>
		</Container>
	);
}
