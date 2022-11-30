import DashboardNavbar from "../../components/navigation/dashboard";

import React from "react";
import styles from "../../assets/styles/App.module.css";
import Card from "../../components/card";
import posts from "../../testdata";

import { useEffect } from "react";
import axios from "axios";
const PendingAppointments = () => {
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
			<DashboardNavbar name="Doctor Dashboard" />
			<main className={styles.section}>
				<div className="flex-1">
					<a className="txt txt-primary normal-case text-xl">Pending Appointments</a>
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

export default PendingAppointments;
