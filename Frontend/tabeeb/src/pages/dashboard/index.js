import { useEffect, useState } from "react";
import DashboardNavbar from "../../components/navigation/dashboard";
import SideBar from "../../components/sidebar";
import { Route, Link, Routes, useParams } from "react-router-dom";
import CurrentApptDoctor from "../viewcurrappt/doctor";
import PendingAppointmentsDoctor from "../viewPendingAppointments";
import "../../assets/styles/dashboard.css";
import PastApptDoctor from "../viewpastappt/doctor";
import DoctorSignupRequests from "../../components/doctorreqs/cards";
import ViewEarnRep from "../../components/earnreports/doctor";
import ViewReports from "../../components/reports/admin";
import MakeAppointment from "../makeAppointment";
import Wallet from "../../components/wallet";
import GetDoctorsList from "../../components/doctorreqs/getdocs";
import ReviewIt from "../../components/review/patient";

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
				{role === "doctor" && params.func === "currentappt" && (
					<CurrentApptDoctor />
				)}
				{role === "patient" && params.func === "currentappt" && (
					<CurrentApptDoctor />
				)}
				{role === "doctor" && params.func === "pastappt" && <PastApptDoctor />}
				{role === "patient" && params.func === "pastappt" && <PastApptDoctor />}
				{role === "doctor" && params.func === "doctorreqs" && (
					<DoctorSignupRequests />
				)}
				{role === "doctor" && params.func === "pendingAppointments" && (
					<PendingAppointmentsDoctor />
				)}
				{role === "doctor" && params.func === "viewearnrep" && <ViewEarnRep />}
				{role === "admin" && params.func === "viewreports" && <ViewReports />}
				{role === "patient" && params.func === "makeAppointment" && (
					<MakeAppointment />
				)}
				{role === "patient" && params.func === "wallet" && <Wallet />}
				{role === "patient" && params.func === "getdoctors" && (
					<GetDoctorsList />
				)}

				{role === "patient" && params.func === "review" && <ReviewIt />}
			</div>
		</div>
	);
};

export default DashboardLayout;
