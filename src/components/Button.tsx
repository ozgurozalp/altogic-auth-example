import type { ComponentPropsWithoutRef } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	renderAs?: 'button' | 'a';
	to?: To;
	className?: string;
}

export default function Button({
	children,
	renderAs = 'button',
	className,
	...props
}: ButtonProps) {
	if (renderAs === 'a') {
		const linkProps = props as LinkProps;
		return (
			<Link
				className={`px-4 py-2 rounded border bg-white transition-all hover:border-gray-500 ${
					className ?? ''
				}`}
				{...linkProps}
			>
				{children}
			</Link>
		);
	}
	return (
		<button
			className={`px-4 py-2 rounded border bg-white transition-all hover:border-gray-500 ${
				className ?? ''
			}`}
			{...props}
		>
			{children}
		</button>
	);
}
