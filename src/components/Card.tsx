import type { ReactNode } from 'react';

export interface CardProps {
	className?: string;
	children?: ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
	return (
		<div
			className="p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl"
			{...props}
		>
			<div className={`p-6 bg-white sm:p-8 rounded-xl ${className ?? ''}`}>{children}</div>
		</div>
	);
}
