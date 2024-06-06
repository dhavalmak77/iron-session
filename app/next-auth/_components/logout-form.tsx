import { logout } from "../actions";

const LogoutForm = () => {
	return (
		<form className="flex" action={logout}>
			<button>NextAuth Logout</button>
		</form>
	);
};

export default LogoutForm;
