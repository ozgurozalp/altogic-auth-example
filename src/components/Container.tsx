import type { ReactNode } from 'react';

export interface ContainerProps {
	className?: string;
	children?: ReactNode;
}

export default function Container({ children, className, ...props }: ContainerProps) {
	return (
		<div className={`container mx-auto ${className ?? ''}`} {...props}>
			{children}
		</div>
	);
}
