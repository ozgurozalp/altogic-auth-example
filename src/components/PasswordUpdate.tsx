import { FormEvent, useId, useRef, useState } from 'react';
import ShowError from './ShowError';
import Input from './Input';
import useAuth from '../hooks/useAuth';

interface PasswordUpdateProps {
	className?: string;
}

export default function PasswordUpdate({ className }: PasswordUpdateProps) {
	const oldPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordConfRef = useRef<HTMLInputElement>(null);
	const [hasChanged, setHasChanged] = useState<boolean>(false);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { changePassword, error } = useAuth();

	const oldPasswordID = useId();
	const newPasswordID = useId();
	const newPasswordConfID = useId();

	const onSubmitHandler = async (e: FormEvent) => {
		e.preventDefault();
		if (!oldPasswordRef.current || !newPasswordRef.current || !newPasswordConfRef.current)
			return;

		if (newPasswordRef.current.value !== newPasswordConfRef.current.value) {
			setPasswordError('New passwords do not match');
			return;
		}

		setIsLoading(true);
		const { success } = await changePassword(
			oldPasswordRef.current.value,
			newPasswordRef.current.value
		);

		if (success) {
			setHasChanged(true);
			oldPasswordRef.current.value =
				newPasswordRef.current.value =
				newPasswordConfRef.current.value =
					'';
		}
		setIsLoading(false);
	};

	return (
		<form className={`bg-white grid gap-4 ${className ?? ''}`} onSubmit={onSubmitHandler}>
			<h2 className="text-center text-xl font-medium py-2">Change Password</h2>

			<ShowError error={error} />

			{hasChanged && (
				<div className="bg-green-500 text-white p-2">
					<p>Your password has been changed</p>
				</div>
			)}

			{passwordError && (
				<div className="bg-red-500 text-white p-2">
					<p>{passwordError}</p>
				</div>
			)}

			<div className="input-group">
				<label className="block text-sm mb-1 text-gray-700" htmlFor={oldPasswordID}>
					Current Password
				</label>
				<Input id={oldPasswordID} ref={oldPasswordRef} type="password" required={true} />
			</div>
			<div className="input-group">
				<label className="block text-sm mb-1 text-gray-700" htmlFor={newPasswordID}>
					New Password
				</label>
				<Input id={newPasswordID} ref={newPasswordRef} type="password" required={true} />
			</div>
			<div className="input-group">
				<label className="block text-sm mb-1 text-gray-700" htmlFor={newPasswordConfID}>
					Password Confirmation
				</label>
				<Input
					id={newPasswordConfID}
					ref={newPasswordConfRef}
					type="password"
					required={true}
				/>
			</div>
			<button
				className="px-4 py-2 border rounded border-gray-400 transition-all hover:border-gray-700 hover:ring-2 hover:ring-gray-700 text-gray-700 active:translate-y-1"
				type="submit"
				disabled={isLoading}
			>
				{isLoading ? 'Processing...' : 'Change'}
			</button>
		</form>
	);
}
