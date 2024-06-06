"use server";

import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "./lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

let username = "dhaval";
let isPremium = true;

export const getSession = async () => {
	const session = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
	}

	return session;
};

export const login = async (
	prevState: { error?: string },
	formData: FormData
) => {
	const session = await getSession();

	const formUsername = formData.get("username") as string;
	const formPassword = formData.get("password") as string;

	if (formUsername !== username) {
		return {
			error: "Wrong credentials",
		};
	}

	session.userId = 1;
	session.username = formUsername;
	session.isPremium = isPremium;
	session.isLoggedIn = true;

	await session.save();
	redirect("/");
};

export const logout = async () => {
	const session = await getSession();
	session.destroy();
	redirect("/");
};

export const changeMembership = async () => {
	const session = await getSession();

	session.isPremium = !session.isPremium;
	await session.save();
	revalidatePath("/profile");
};
