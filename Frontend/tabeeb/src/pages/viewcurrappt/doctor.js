import DashboardNavbar from "../../components/navigation/dashboard";

import React from "react";
import styles from "../../assets/styles/App.module.css";
import Card from "../../components/card";
import posts from "../../components/appointments/cards/testdata";

import { useEffect } from "react";
import axios from "axios";
import AppointmentCard from "../../components/appointments/cards";

const CurrentApptDoctor = () => {
	return (
		<>
			{console.log("Current Appointment")}
			<AppointmentCard function="currentapt" />
		</>
	);
};

export default CurrentApptDoctor;
