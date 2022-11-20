import DashboardNavbar from "../../../components/navigation/dashboard";
import { useEffect } from "react";
import axios from "axios";
import SideBar from "../../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../../services/utils/auth";

const AdminDashboard = () => {
	const navigate = useNavigate();
	useEffect(() => {
		console.log("Admin Dashboard");
		setAuthToken(localStorage.getItem("token"));
		axios
			.get("/api/v1/admin/home", {
				headers: {
					"ngrok-skip-browser-warning": "true",
					"cache-control": "no-cache",
				},
			})
			.then((res) => {
				console.log(res.data);
			});
		const role = localStorage.getItem("role");
		const token = localStorage.getItem("token");
		if (!token || role != "admin") {
			navigate("/login");
		}
	}, []);
	return (
		<>
			<DashboardNavbar />
			<SideBar role="admin" />
		</>
	);
};

export default AdminDashboard;
