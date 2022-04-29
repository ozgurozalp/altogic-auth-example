import type { ReactNode } from 'react';

export interface CardProps {
	className?: string;
	children?: ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
	return (
		<div
			className={`shadow-xl rounded-2xl p-6 bg-white sm:p-8 rounded-xl ${className ?? ''}`}
			{...props}
		>
			{children}
		</div>
	);
}
