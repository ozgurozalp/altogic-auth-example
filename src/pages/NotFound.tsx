import Button from '../components/Button';

export default function NotFound() {
	return (
		<div className="h-full flex flex-col gap-4 px-4 justify-center items-center">
			<h1 className="text-8xl text-center">404</h1>
			<img
				src="https://media1.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif?cid=ecf05e47y32f2f8bsamcj02i4v1xiw2ru629bya9we3n1z8c&rid=giphy.gif&ct=g"
				alt="404"
				className="rounded drop-shadow"
			/>
			<Button renderAs="a" to="/">
				Go Home
			</Button>
		</div>
	);
}
