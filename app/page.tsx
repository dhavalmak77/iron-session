import Link from "next/link";

export default function Home() {
	return (
		<div className="home">
			<h1 className="text-3xl font-semibold mb-7">Sessions</h1>

			<div className="flex justify-evenly font-semibold">
				<Link
					href="/iron-session/profile"
					className="border border-slate-800 rounded-sm max-w-[180px] w-full font-semibold hover:text-white hover:bg-slate-800"
				>
					Iron Session
				</Link>
				<Link
					href="/next-auth/profile"
					className="border border-slate-800 rounded-sm max-w-[180px] w-full font-semibold hover:text-white hover:bg-slate-800"
				>
					Next Auth
				</Link>
			</div>
		</div>
	);
}
