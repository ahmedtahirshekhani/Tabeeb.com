// import posts from "./testdata";
import DoctorCard from "../doctorcard";
import styles from "../../assets/styles/App.module.css";
import { useEffect } from "react";
import {
	getDoctors,
	GetDoctorsListService,
} from "../../services/utils/adminfunction";

import React from "react";
const GetDoctorsList = () => {
	const [cardposts, setPost] = React.useState([]);
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	useEffect(() => {
		GetDoctorsListService()
			.then((res) => {
				console.log(res.data);
				setPost(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const getCards = () => {
		const tempList = [];
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
					params="doctorlist"
				/>
			);
		});
		return tempList;
	};
	return (
		<div>
			{console.log("Iam in getdocs")}
			<section className={styles.container}>
				<div className={styles.layout}>{getCards()}</div>
			</section>
		</div>
	);
};

export default GetDoctorsList;
