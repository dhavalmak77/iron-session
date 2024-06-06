"use client";

import Link from "next/link";
import LogoutForm from "./logout-form";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { getSession } from "../actions";
import { SessionData } from "../lib";

const navigation = [
	{ access: [], label: "Home", path: "/" },
	{ access: [], label: "Premium", path: "/next-auth/premium" },
	{ access: [], label: "Login", path: "/next-auth/login" },
	{ access: [], label: "Profile", path: "/next-auth/profile" },
];

const Navbar = () => {
	const [session, setSession] = useState<SessionData>({});
	const pathname = usePathname();

	useLayoutEffect(() => {
		(async () => {
			await getSession().then((session: SessionData) => {
				setSession(session);
			});
		})();
	}, []);

	return (
		<nav className="space-x-7 flex justify-center m-auto bg-slate-800 w-full text-center p-3 text-white">
			{navigation.map((nav) => {
				if (
					nav.access.length &&
					!nav.access.includes(session?.isLoggedIn)
				) {
					return null;
				}

				if (pathname === "/" && pathname !== nav.path) {
					return null;
				}

				return (
					<Link
						key={nav.path}
						href={nav.path}
						className={pathname === nav.path ? "border-b-2" : ""}
					>
						{nav.label}
					</Link>
				);
			})}
			{session.isLoggedIn && <LogoutForm />}
		</nav>
	);
};

export default Navbar;
