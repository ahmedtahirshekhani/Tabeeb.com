// import posts from "./testdata";
import Card from "../../card";
import styles from "../../../assets/styles/App.module.css";
import { useEffect } from "react";
import {
	getCurrentAppt,
	getPastAppt,
	getPendingAppt,
} from "../../../services/utils/sidebarfunctions";
import React from "react";
const AppointmentCard = (props) => {
	const [post, setPost] = React.useState([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		const role = localStorage.getItem("role");
		const func = props.function;
		if (func === "currentapt") {
			getCurrentAppt(role, token)
				.then((res) => {
					setPost(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (func === "pastapt") {
			getPastAppt(role, token)
				.then((res) => {
					setPost(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else if (func === "pendingappt") {
			getPendingAppt(role, token)
				.then((res) => {
					setPost(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);
	const getCards = () => {
		const func = props.function;
		const tempList = [];
		post.map((element, index) => {
			console.log(element)

			const date = element.date_time.split("T")[0];
			const time = element.date_time.split("T")[1].slice(0,-5);

			tempList.push(
				<Card
					key={element.appointment_id}
					name={element.d_cnic}
					id={element.appointment_id}
					date={date}
					time={time}
					charges={element.charges}
					prescription={element.prescription}
					d_cnic = {element.d_cnic}
					props = {func}
					patient_phone = {element.patient_phone}
					patient_name = {element.full_name}
				/>
			);
		});
		return tempList;
	};
	return (
		<div>
			<section className={styles.container}>
				<div className={styles.layout}>{getCards()}</div>
			</section>
		</div>
	);
};

export default AppointmentCard;
