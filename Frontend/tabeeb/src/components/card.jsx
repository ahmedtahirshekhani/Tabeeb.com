import React from "react";
import classNames from "classnames";

import styles from "../assets/styles/card.module.css";

const Card = ({ id, name , date, time, charges, prescription, props }) => {
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
        {props == "currentappt" ? <button className="btn btn-primary">Finish Appointment</button> : null}
      </div>
    </div>
  );
};

export default Card;