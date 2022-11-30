// import posts from "./testdata";
import Card from "../../card";
import styles from "../../../assets/styles/App.module.css";
import { useEffect } from "react";
import { getCurrentAppt } from "../../../services/utils/sidebarfunctions";
import React from "react";
const AppointmentCard = () => {
	const [post, setPost] = React.useState([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		const role = localStorage.getItem("role");
		getCurrentAppt(role, token)
			.then((res) => {
				setPost(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const getCards = () => {
		const tempList = [];
		post.map((element, index) => {
			const date = element.date.split("T")[0];

			tempList.push(
				<Card
					key={element.appointment_id}
					name={element.d_cnic}
					id={element.appointment_id}
					date={date}
					time={element.time}
					charges={element.charges}
					prescription={element.prescription}
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
