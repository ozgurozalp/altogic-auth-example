import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import type { ReactElement } from 'react';
import Home from '../pages/Home';
import useAuth from '../hooks/useAuth';
import NotFound from '../pages/NotFound';

const routes = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: (
			<GuestOnly>
				<Login />
			</GuestOnly>
		),
	},
	{
		path: '/register',
		element: (
			<GuestOnly>
				<Register />
			</GuestOnly>
		),
	},
	{
		path: '/profile',
		element: (
			<RequireAuth>
				<Profile />
			</RequireAuth>
		),
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

export default function RouteList() {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((props, index) => (
					<Route {...props} key={index} />
				))}
			</Routes>
		</BrowserRouter>
	);
}

function RequireAuth({ children }: { children: ReactElement }): JSX.Element {
	const { user, session } = useAuth();
	const location = useLocation();

	if (!user || !session) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}
function GuestOnly({ children }: { children: ReactElement }): JSX.Element {
	const { user, session } = useAuth();

	if (user && session) {
		return <Navigate to="/profile" />;
	}

	return children;
}
