"use client";

import Link from "next/link";
import LogoutForm from "./iron-session/_components/logout-form";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { getSession } from "./iron-session/actions";
import { SessionData } from "./iron-session/lib";

const navigation = [{ access: [], label: "Home", path: "/" }];

const navigationIron = [
	{ access: [], label: "Premium", path: "/iron-session/premium" },
	{ access: [false], label: "Login", path: "/iron-session/login" },
	{ access: [true], label: "Profile", path: "/iron-session/profile" },
];

const navigationNext = [
	{ access: [], label: "Premium", path: "/next-auth/premium" },
	{ access: [], label: "Login", path: "/next-auth/login" },
	{ access: [], label: "Profile", path: "/next-auth/profile" },
];

const Navbar = () => {
	const [session, setSession] = useState<SessionData>({ isLoggedIn: false });
	const pathname = usePathname();

	useLayoutEffect(() => {
		(async () => {
			await getSession().then((session: SessionData) => {
				setSession(session);
			});
		})();
	}, [pathname]);

	let filteredNavigation = navigation;
	if (pathname.includes("/iron-session")) {
		filteredNavigation = navigationIron;
	} else if (pathname.includes("/next-auth")) {
		filteredNavigation = navigationNext;
	}

	return (
		<nav className="space-x-7 flex justify-center m-auto bg-slate-800 w-full text-center p-3 text-white">
			{filteredNavigation.map((nav) => {
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
