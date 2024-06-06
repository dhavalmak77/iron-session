import CredentialsProvider from "next-auth/providers/credentials";

interface CredentialsData {
	username: string;
	password: string;
}

const options = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			Credential: {},
			async authorize(credentials: CredentialsData) {
				const { username, password } = credentials;
				if (!username && !password) {
					throw new Error(
						"Required fields are empty. Please check and try again."
					);
				} else {
					if (!username) {
						throw new Error(
							"Username is missing. Please try again."
						);
					} else if (!password) {
						throw new Error(
							"Password is missing. Please try again."
						);
					}
				}
				// let user;
				// try {
				// const client = await pool.connect();
				// if (
				// 	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
				// 		usernameOrEmail
				// 	)
				// ) {
				// 	user = await client.query(
				// 		`SELECT * FROM users WHERE email='${usernameOrEmail}'`
				// 	);
				// } else {
				// 	user = await client.query(
				// 		`SELECT * FROM users WHERE username='${usernameOrEmail}'`
				// 	);
				// }
				// if (user?.rowCount === 1) {
				// 	if (user?.rows[0]?.password === password) {
				// 		return user?.rows[0];
				// 	} else {
				// 		throw new Error("Incorrect Password!!");
				// 	}
				// } else {
				// 	throw new Error("User not found");
				// }
				if (username !== "admin" && password !== "admin") {
					throw new Error("User not found");
				}

				return {
					username,
					password,
					isLoggedIn: true,
					isPremium: false,
				};
				// } catch (error) {
				// 	throw new Error("Error while login");
				// }
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log("signIn", "user", user);
			console.log("signIn", "account", account);
			console.log("signIn", "profile", profile);
			console.log("signIn", "email", email);
			console.log("signIn", "credentials", credentials);

			console.log("AAAAAAAAAAAAAA", {
				user,
				account,
				profile,
				email,
				credentials,
			});
			// await updateDataToSessionStorage({ user, account, profile, email, credentials });

			return user; // Do different verification for other providers that don't have `email_verified`
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log("jwt", "token", token);
			console.log("jwt", "user", user);
			console.log("jwt", "account", account);
			console.log("jwt", "profile", profile);
			console.log("jwt", "isNewUser", isNewUser);
			if (account?.provider) {
				token.account = account;
			}

			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token, user }) {
			console.log("session", "session", session);
			console.log("session", "token", token);
			console.log("session", "user", user);

			return { ...session, token };
		},
	},
	session: {
		strategy: "jwt",
	},
	// pages: {
	//     signIn: "/login",
	// },
};

export { options };
