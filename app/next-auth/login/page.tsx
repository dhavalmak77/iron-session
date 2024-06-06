"use client";

import { useSession } from "next-auth/react";
import LoginForm from "../_components/login-form";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

var startTime = performance.now();
export default function Login() {
	const { data: authSession, status: loading } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (loading === "loading") {
			return;
		} else if (loading === "authenticated") {
			console.log("Authenticated--", performance.now() - startTime);
			if (authSession?.token?.user) {
				// console.log(
				// 	"Authenticated session obtained at: ",
				// 	performance.now()
				// );
			}
		}
	}, [authSession]);

	return (
		<div className="login">
			<h1 className="text-3xl font-semibold">Login Page</h1>
			{
				<p className="text-7xl font-semibold">
					{loading === "loading" ? "Loading..." : ""}
				</p>
			}
			<LoginForm />
		</div>
	);
}
