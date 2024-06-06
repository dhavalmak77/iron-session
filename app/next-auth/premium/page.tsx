import { changeMembership, getSession } from "../actions";
import { SessionData } from "../lib";

export default async function Premium() {
	const session: SessionData = await getSession();

	return (
		<div className="premium">
			<h1 className="text-3xl font-semibold mb-2">Premium Page</h1>

			{session?.isLoggedIn ? (
				<p className="text-green-800">Premium User</p>
			) : (
				<p className="text-red-900">
					Hey there, you are not a premium user
				</p>
			)}
			<form action={changeMembership}>
				<button className="border border-slate-800 rounded-sm max-w-[150px] w-full font-semibold hover:text-white hover:bg-slate-800 text-sm">
					{session?.isPremium
						? "Cancel Membership"
						: "Become Premium"}
				</button>
			</form>
		</div>
	);
}
