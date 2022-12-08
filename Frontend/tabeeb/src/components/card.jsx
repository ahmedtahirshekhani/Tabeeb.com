import React from "react";
import classNames from "classnames";

import styles from "../assets/styles/card.module.css";
import axios from "axios";


const Card = ({ id, name , date, time, charges, prescription, props }) => {
  const acceptPending = (id) => {
    axios.post("/api/v1/doctor/acceptAppointment", { appointment_id: id }).then((res) => {
      console.log(res.data);
      if(res.data.success == true){

        window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    })

  }
  const rejectPending = (id) => {
    axios.post("/api/v1/doctor/rejectAppointment", { appointment_id: id }).then((res) => {
      console.log(res.data);
      if(res.data.success == true){

        window.location.reload();
      }
    }
    ).catch((err) => {
      console.log(err);
    }
    )
  }
  return (
    <div className={classNames([styles.wrapper, styles.wrapperAnime])}>
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
        <h1 className={styles.text}>{`Appointment ID: ${id}`}</h1>
        <h1 className={styles.text}>{`Doctor CNIC: ${name}`}</h1>
        <h1 className={styles.text}>{`Date: ${date}`}</h1>
        <h1 className={styles.text}>{`Time: ${time}`}</h1>
        <h1 className={styles.text}>{`Charges: ${charges}`}</h1>
        <h1 className={styles.text}>{`Prescription: ${prescription}`}</h1>
        {props == "currentapt" ? <button className="btn btn-primary btn-wide">Finish Appointment</button> : null}
        {props == "pendingappt" ? <div ><button className="btn btn-primary btn-wide" onClick={()=>acceptPending(id)}>Accept</button> <button className="btn btn-outline btn-error btn-wide" onClick={()=>rejectPending(id)}>Reject</button></div> : null}
      </div>
    </div>
  );
};

export default Card;