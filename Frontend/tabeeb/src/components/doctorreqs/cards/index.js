// import posts from "./testdata";
import DoctorCard from "../../doctorcard";
import styles from "../../../assets/styles/App.module.css";
import { useEffect } from "react";
import testdata from "./testdata";
import { getDoctors } from "../../../services/utils/adminfunction";

import React from "react";
const DoctorSignupRequests = () => {
	const [cardposts, setPost] = React.useState([]);
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	useEffect(() => {
		getDoctors(role, token)
			.then((res) => {
				console.log(res.data);
				setPost(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const getCards = () => {
		const tempList = [];
		console.log(cardposts);
		cardposts.map((element, index) => {
			tempList.push(
				<DoctorCard
					key={index + 1}
					id={index + 1}
					cnic={element.cnic}
					email={element.email}
					phone_number={element.phone_number}
					full_name={element.full_name}
					about_doctor={element.about_doctor}
					street_address={element.street_address}
					city={element.city}
					pmc_reg={element.pmc_reg}
					role={role}
					params="doctorreqs"
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

export default DoctorSignupRequests;
