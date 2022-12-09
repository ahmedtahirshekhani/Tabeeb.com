import React from "react";
import classNames from "classnames";

import styles from "../assets/styles/card.module.css";
import axios from "axios";
import { sendPresc } from "../services/utils/appointments";


const Card = ({ id, name , date, time, charges, prescription, props }) => {
  const role = localStorage.getItem("role");
  const [presc, setPresc] = React.useState("");

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

  const sendPrescript = (id) => {
    sendPresc(id, presc).then((res) => {
      console.log(res);
      if(res.status == 200){
        if(window.confirm("Prescription sent successfully")){
          window.location.reload();
        }
      }
    }
    ).catch((err) => {
      console.log(err);
    })
  }

  const askForPrescription = (id)=>{
    return(<div className="p-5">
      {/* The button to open modal */}
<label htmlFor="my-modal" className="btn m-5">Finish Appointment</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Enter Prescription:</h3>
    <textarea className="w-full h-32 p-2 border border-gray-300 rounded mt-2 mb-4" placeholder="Enter Prescription" onChange={(e)=>setPresc(e.target.value)}></textarea>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn" onClick = {()=>sendPrescript(id)}>Done</label>
    </div>
  </div>
</div>
</div>
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
        {props != "currentapt" &&<h1 className={styles.text}>{`Prescription: ${prescription}`}</h1>}
        {role==="doctor" && props == "currentapt" ? askForPrescription(id)  : null}
        {props == "pendingappt" ? <div ><button className="btn btn-primary btn-wide" onClick={()=>acceptPending(id)}>Accept</button> <button className="btn btn-outline btn-error btn-wide" onClick={()=>rejectPending(id)}>Reject</button></div> : null}
      </div>
    </div>
  );
};

export default Card;