import useAuth from '../hooks/useAuth';
import Container from '../components/Container';

export default function AuthRedirect() {
	const { verifyToken } = useAuth();

	verifyToken();

	return (
		<Container className="h-full flex items-center justify-center">
			<h1 className="text-6xl text-center">You are redirecting...</h1>
		</Container>
	);
}
