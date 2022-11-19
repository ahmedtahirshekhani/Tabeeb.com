import DashboardNavbar from "../../../components/navigation/dashboard";
import { useEffect } from "react";
import axios from "axios";
const AdminDashboard = () => {
	useEffect(() => {
		console.log("Admin Dashboard");
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
	}, []);
	return (
		<>
			<DashboardNavbar />
		</>
	);
};

export default AdminDashboard;
