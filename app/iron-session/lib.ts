import { SessionOptions } from "iron-session";

export interface SessionData {
	userId?: string | number;
	username?: string;
	image?: string;
	isPremium?: boolean;
	isLoggedIn?: boolean;
}

export const defaultSession: SessionData = {
	isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
	password: process.env.SECRET_KEY!,
	cookieName: "auth-cookie-session",
	cookieOptions: {
		httpOnly: true,
		secure: true,
	},
};
