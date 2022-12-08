import React from "react";
import classNames from "classnames";
//import { BsCalendarCheck } from "react-icons/bs";
import { useEffect } from "react";
import styles from "../assets/styles/card.module.css";
import { acceptRejectDoctor } from "../services/utils/adminfunction";

const PatientCard = ({ id, cnic, email, phone_number, full_name, about_doctor, street_address, city , role, params  }) => {
  const [reqButton, setReqButton] = React.useState(false);
  const [render, setRender] = React.useState(false);
  useEffect(() => {
    if (role === "admin" && params === "doctorreqs"){
      setReqButton(true);
    }
  }, [render]);
  const btnClick = (cnic, type) => {
    const token = localStorage.getItem("token");
    acceptRejectDoctor(cnic, token, type).then((res) => {
      console.log(res);
      window.location.reload();
      
    }).catch((err) => {
      console.log(err);
      window.location.reload();
    });
  }
  return (
    <div className="m-4">
    <div className={classNames([styles.wrapper])}>
      <div className={styles.header}>
        <div className={styles.badgeWrapper}>
          <div
            className={classNames([
              styles.primaryBadge,
              styles.badgeAnime,
              "group",
            ])}
          >
            {/* <BsCalendarCheck /> */}
            <span
              className={classNames([styles.counter, "group-hover:text-white"])}
            >
              {id}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.text}>{`Doctor CNIC: ${cnic}`}</h1>
        <h1 className={styles.text}>{`Email: ${email}`}</h1>
        <h1 className={styles.text}>{`Phone Number: ${phone_number}`}</h1>
        <h1 className={styles.text}>{`Full Name: ${full_name}`}</h1>
        <h1 className={styles.text}>{`About Doctor: ${about_doctor}`}</h1>
        <h1 className={styles.text}>{`Street Address: ${street_address}`}</h1>
        <h1 className={styles.text}>{`City: ${city}`}</h1>
        {/* <h1 className={styles.text}>{`PMC Reg: ${pmc_reg}`}</h1> */}
  
      </div>
      {/* {reqButton && ( */}
      <div>
      <button className="btn btn-primary m-3" onClick={()=>btnClick(cnic, 'accept')}>Make Appointment</button>
      {/* <button className="btn m-3" onClick={()=>btnClick(cnic, 'reject')}>Reject</button> */}
      </div>
      {/* )} */}
    </div>
    </div>
  );
};

export default PatientCard;