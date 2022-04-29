import type { APIError } from 'altogic';

interface ShowErrorProps {
	error?: APIError | null;
}

export default function ShowError({ error }: ShowErrorProps) {
	if (!error) return null;
	return (
		<div className="bg-red-500 text-white p-2">
			{error.items.map((e, index) => (
				<p key={index}>{e.message}</p>
			))}
		</div>
	);
}
