import React, { useEffect } from "react";
import styles from "../assets/styles/App.module.css";
import Card from "./newcard";
import { getTotalAmount } from "../services/utils/wallet";

const Wallet = () => {
	const [amount, setAmount] = React.useState([]);
	useEffect(() => {
		getTotalAmount()
			.then((res) => {
				console.log(res.data);
				const balance = res.data.balance.toFixed(2);
				setAmount(balance);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<section className={styles.container}>
				<div className={styles.layout}>
					<Card amount={amount} />
				</div>
			</section>
		</>
	);
};

export default Wallet;
