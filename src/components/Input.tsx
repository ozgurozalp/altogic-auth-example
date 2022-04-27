import type { ComponentPropsWithRef, ForwardedRef } from 'react';
import { forwardRef } from 'react';

export interface InputProps extends ComponentPropsWithRef<'input'> {
	className?: string;
	type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
}

const Input = forwardRef(
	({ type = 'text', className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => (
		<input
			ref={ref}
			type={type}
			className={`rounded border-gray-400 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 ${
				className ?? ''
			}`}
			{...props}
		/>
	)
);

export default Input;
