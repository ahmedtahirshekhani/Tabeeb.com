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
        {props == "currentapt" ? <button className="btn btn-primary btn-wide">Finish Appointment</button> : null}
        {props == "pendingappt" ? <div ><button className="btn btn-primary btn-wide">Accept</button> <button className="btn btn-outline btn-error btn-wide">Reject</button></div> : null}
        {props == "pastapt" ? 
        <div>
        <div className="dropdown dropdown-hover p-5" >
          <label tabIndex={0} className="btn m-1">Rate Doctor</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>1</a></li>
            <li><a>2</a></li>
            <li><a>3</a></li>
            <li><a>4</a></li>
            <li><a>5</a></li>
            
          </ul>
        </div>
        <div className="form-control">
        <label className="label">
          <span className="label-text">Add Review</span>
        </label>
        <input
          type="text"
          placeholder="Review"
          className="input input-bordered"
          // onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="form-control mt-6">
					<button className="btn btn-primary" 
          // onClick={() => login()}
          >
						Submit Review
					</button>
				</div>
        </div>
        
        



        : null}
      </div>
    </div>
  );
};

export default Card;