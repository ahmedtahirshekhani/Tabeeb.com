import DashboardNavbar from "../../components/navigation/dashboard";

import React from "react";
import styles from "../../assets/styles/App.module.css";
import Card from "../../components/card";
import posts from "../../components/appointments/cards/testdata";

import { useEffect } from "react";
import axios from "axios";
import AppointmentCard from "../../components/appointments/cards";
import { pendingAppointments } from "../../services/utils/appointments";

const PendingAppointmentsDoctor = () => {
	useEffect(() => {
		const role = localStorage.getItem("role");
		const token = localStorage.getItem("token");
		
	}, []);

	return (
		<>
			{console.log("Pending Appointments")}
			<AppointmentCard function="pendingappt" />
		</>
	);
};

export default PendingAppointmentsDoctor;
