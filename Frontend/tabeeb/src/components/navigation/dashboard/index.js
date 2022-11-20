import SearchBar from "../searchbar";
import { useNavigate } from "react-router-dom";
const DashboardNavbar = (props) => {
	const navigate = useNavigate();
	const clearToken = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		navigate("/");
	};
	return (
		<div className="navbar bg-primary text-primary-content">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">{props.name}</a>
			</div>
			<div className="flex-none gap-2">
				{props.name == "Patient Dashboard" ? <SearchBar /> : null}
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img src="https://placeimg.com/80/80/people" />
						</div>
					</label>
					<ul
						tabIndex={0}
						className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<a className="justify-between text-white">
								Profile
								<span className="badge">New</span>
							</a>
						</li>

						<li>
							<a href="/dashboard/admin/change_password" className="text-white">
								Change Password
							</a>
						</li>
						<li>
							<a className="text-white" onClick={() => clearToken()}>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardNavbar;
