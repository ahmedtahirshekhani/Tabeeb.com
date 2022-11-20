import DashboardNavbar from "../../../components/navigation/dashboard";
import { useEffect } from "react";
import axios from "axios";
const DoctorDashboard = () => {
	useEffect(() => {
		console.log("Doctor Dashboard");
		axios
			.get("/api/v1/doctor/home", {
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
			<DashboardNavbar name='Doctor Dashboard' />
		</>
	);
};

export default DoctorDashboard;
