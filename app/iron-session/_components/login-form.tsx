"use client";

import { useFormState } from "react-dom";
import { login } from "../actions";

const LoginForm = () => {
	const [formState, formAction] = useFormState<any, FormData>(
		login,
		undefined
	);

	return (
		<form
			className="flex flex-col justify-center items-start mt-5 gap-2 max-w-[200px] mx-auto"
			action={formAction}
		>
			<input
				type="text"
				name="username"
				required
				placeholder="Username"
				className="border-none rounded-sm bg-slate-700 py-1 px-[6px] text-white text-sm outline-none"
			/>

			<input
				type="password"
				name="password"
				required
				placeholder="Password"
				className="border-none rounded-sm bg-slate-700 py-1 px-[6px] text-white text-sm outline-none"
			/>

			<button className="border border-slate-800 rounded-sm max-w-[200px] w-full font-semibold hover:text-white hover:bg-slate-800">
				Login
			</button>

			{formState?.error && (
				<p className="text-red-500 border border-red-500 w-full text-start px-1 py-[2px] bg-red-100 rounded-sm max-w-[200px] text-xs">
					{formState.error}
				</p>
			)}
		</form>
	);
};

export default LoginForm;
