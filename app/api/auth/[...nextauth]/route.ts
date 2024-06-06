import NextAuth from "next-auth/next";
import { options } from "./options";

const handler = NextAuth(options);

// const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
