import posts from "./testdata";
import Card from "../../card";
import styles from "../../../assets/styles/App.module.css";
const AppointmentCard = () => {
	return (
		<div>
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
		</div>
	);
};

export default AppointmentCard;
