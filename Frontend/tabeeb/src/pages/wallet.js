import DashboardNavbar from "../components/navigation/dashboard";
import React from "react";
import  { useState } from 'react';


import styles from "../assets/styles/App.module.css";
import Card from "../components/newcard";
import posts from "../components/appointments/cards/testdata";

const Wallet = (props) => {
  const [Amount, setAmoount] = React.useState([]);
  
  return (
    <>
			<DashboardNavbar name='Patient Dashboard' />
	
            <main className={styles.section}>
            <section className={styles.container}>
                <div className={styles.layout}>
                
                    <Card
                    amount={posts[0].amount}
                    // likes={posts[0].likes}
                    //   order={index + 1}
                    image={posts[0].image}
                    />
                </div>
            </section>
            </main>
    </>
  );
};

export default Wallet;