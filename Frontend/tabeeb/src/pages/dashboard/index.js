import { useEffect, useState } from "react";
import DashboardNavbar from "../../components/navigation/dashboard";
import SideBar from "../../components/sidebar";
import { Route, Link, Routes, useParams } from "react-router-dom";
import CurrentApptDoctor from "../viewcurrappt/doctor";
import "../../assets/styles/dashboard.css";
import PastApptDoctor from "../viewpastappt/doctor";
import DoctorSignupRequests from "../../components/doctorreqs/cards";

const DashboardLayout = () => {
	const role = localStorage.getItem("role");
	const params = useParams();

	useEffect(() => {
		const func = params.func;
		console.log(func);
	}, []);
	return (
		<div>
			<DashboardNavbar name={role} />
			<SideBar role={role} />
			<div style={{ marginTop: "80px" }}>
				{/* {params.func === "pendingappt" && <PendingAppt />} */}
				{params.func === "currentappt" && <CurrentApptDoctor />}
				{params.func === "pastappt" && <PastApptDoctor />}
				{params.func === "doctorreqs" && <DoctorSignupRequests />}
			</div>
		</div>
	);
};

export default DashboardLayout;
