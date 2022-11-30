import DashboardNavbar from "../../components/navigation/dashboard";
import { useEffect } from "react";
import axios from "axios";

import React from "react";
import styles from "../../assets/styles/App.module.css";
import Card from "../../components/card";
import posts from "../../testdata";

const PastApptPatient = () => {
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
			<DashboardNavbar name="Patient Dashboard" />
			<main className={styles.section}>
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">
						Current Appointments
					</a>
				</div>

				<section className={styles.container}>
					<div className={styles.layout}>
						{posts.map((element, index) => (
							<Card
								key={index}
								name={element.name}
								id={element.id}
								date={element.date}
								time={element.time}
								charges={element.charges}
								prescription={element.prescription}
							/>
						))}
					</div>
				</section>
			</main>
		</>
	);
};

export default PastApptPatient;
