import { useEffect, useState } from "react";
import DashboardNavbar from "../../components/navigation/dashboard";
import SideBar from "../../components/sidebar";
import { Route, Link, Routes, useParams } from "react-router-dom";
import CurrentApptDoctor from "../viewcurrappt/doctor";
import "../../assets/styles/dashboard.css";
import PastApptDoctor from "../viewpastappt/doctor";
import DoctorSignupRequests from "../../components/doctorreqs/cards";
import ViewEarnRep from "../../components/earnreports/doctor";
import ViewReports from "../../components/reports/admin";

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
				{role === "doctor" && params.func === "viewearnrep" && <ViewEarnRep />}
				{role === "admin" && params.func === "viewreports" && <ViewReports />}
			</div>
		</div>
	);
};

export default DashboardLayout;
