import DashboardNavbar from "../../../components/navigation/dashboard";
import { useEffect } from "react";
import axios from "axios";
const PatientDashboard = () => {
	useEffect(() => {
		console.log("Patient Dashboard");
		axios
			.get("/api/v1/patient/home", {
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
			<DashboardNavbar name='Patient Dashboard' />
		</>
	);
};

export default PatientDashboard;
