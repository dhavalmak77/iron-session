"use client";

import { signIn, useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { data: nextSession } = useSession();

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!username || !password) {
			setError("Required fields are empty. Please check and try again.");
			return;
		}

		setError("");

		try {
			const response = await signIn("credentials", {
				username,
				password,
				redirect: false,
			});

			console.log("RESPONSE", response);
		} catch (error: Error) {
			setError(error.message);
		}
	};

	return (
		<form
			className="flex flex-col justify-center items-start mt-5 gap-2 max-w-[200px] mx-auto"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				name="username"
				required
				placeholder="Username"
				className="border-none rounded-sm bg-slate-700 py-1 px-[6px] text-white text-sm outline-none"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<input
				type="password"
				name="password"
				required
				placeholder="Password"
				className="border-none rounded-sm bg-slate-700 py-1 px-[6px] text-white text-sm outline-none"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button className="border border-slate-800 rounded-sm max-w-[200px] w-full font-semibold hover:text-white hover:bg-slate-800">
				Login
			</button>

			{error && (
				<p className="text-red-500 border border-red-500 w-full text-start px-1 py-[2px] bg-red-100 rounded-sm max-w-[200px] text-xs">
					{error}
				</p>
			)}
		</form>
	);
};

export default LoginForm;
