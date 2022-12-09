import React from "react";
import classNames from "classnames";

import styles from "../assets/styles/card.module.css";
import axios from "axios";
import { sendPresc } from "../services/utils/appointments";
import { sendReview } from "../services/utils/review";

const Card = ({ id, name, date, time, charges, prescription, d_cnic, props, d_name}) => {
  const role = localStorage.getItem("role");
  const [presc, setPresc] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const [review, setReview] = React.useState("");
  console.log("doctor name", d_name)



  const acceptPending = (id) => {
    axios.post("/api/v1/doctor/acceptAppointment", { appointment_id: id }).then((res) => {
      console.log(res.data);
      if (res.data.success == true) {

        window.location.reload();
      }
    }).catch((err) => {
      console.log(err);
    })

  }
  const rejectPending = (id) => {
    axios.post("/api/v1/doctor/rejectAppointment", { appointment_id: id }).then((res) => {
      console.log(res.data);
      if (res.data.success == true) {

        window.location.reload();
      }
    }
    ).catch((err) => {
      console.log(err);
    }
    )
  }

  const getReview = (idval) => {
    return (
      <div>
        {console.log('getReview Idval', idval)}
        <div className="dropdown dropdown-hover p-5" >
          <select className="select select-info w-full max-w-xs" onChange={(e) => setRate(e.target.value)}>
            <option disabled selected>Rate Doctor </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Add Review {idval}</span>
          </label>
          <input
            type="text"
            placeholder="Review"
            className="input input-bordered"
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

      </div>

    )
  }


  const getReport = (idval) => {
    return (
      <div>
        {console.log('getReport Idval', idval)}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Reason for report {idval}</span>
          </label>
          <input
            type="text"
            placeholder="Reason"
            className="input input-bordered"
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

      </div>

    )
  }

  const reviewSubmit = (idt) => {
    console.log(rate, review, idt);
    // sendReview(rate, review, d_cnic, idt).then((res) => {
    //   console.log(res);
    //   if(res.status == 200){
    //     if(window.confirm("Review sent successfully")){
    //       window.location.reload();
    //     }
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // }
    // )
  }


  const reviewPopup = (idval) => {
    console.log('review pop up', idval)
    return (
      <div className="m-5">
        <label htmlFor="my-modal" className="btn">Review It* {idval}</label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Review the Doctor! {idval}</h3>
            {console.log('review pop up', idval)}
            {getReview(idval)}
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn" onClick={() => reviewSubmit(idval)}>Done</label>
              <label htmlFor="my-modal" className="btn" onClick={() => window.location.reload()}>Cancel</label>
            </div>
          </div>
        </div>
      </div>

    )
  }



  const reportPopup = (idval) => {
    console.log('report pop up', idval)
    return (
      <div className="m-5">
        <label htmlFor="my-modal" className="btn">Report Doctor* {idval}</label>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Report the Doctor! {idval}</h3>
            {/* {console.log('report pop up', idval)}
            {getReport(idval)} */}
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn" >Done</label>
              {/* <label htmlFor="my-modal" className="btn" onClick={() => window.location.reload()}>Cancel</label> */}
            </div>
          </div>
        </div>
      </div>

    )
  }

  const sendPrescript = (id) => {
    sendPresc(id, presc).then((res) => {
      console.log(res);
      if (res.status == 200) {
        if (window.confirm("Prescription sent successfully")) {
          window.location.reload();
        }
      }
    }
    ).catch((err) => {
      console.log(err);
    })
  }

  const askForPrescription = (id) => {
    return (<div className="p-5">
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn m-5">Finish Appointment</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enter Prescription:</h3>
          <textarea className="w-full h-32 p-2 border border-gray-300 rounded mt-2 mb-4" placeholder="Enter Prescription" onChange={(e) => setPresc(e.target.value)}></textarea>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn" onClick={() => sendPrescript(id)}>Done</label>
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
        <h1 className={styles.text}>{`Doctor Name: ${d_name}`}</h1>
        <h1 className={styles.text}>{`Date: ${date}`}</h1>
        <h1 className={styles.text}>{`Time: ${time}`}</h1>
        <h1 className={styles.text}>{`Charges: ${charges}`}</h1>

        {props != "currentapt" && <h1 className={styles.text}>{`Prescription: ${prescription}`}</h1>}
        {role === "doctor" && props == "currentapt" ? askForPrescription(id) : null}
        {role === "doctor" && props == "pendingappt" ? <div ><button className="btn btn-primary btn-wide" onClick={() => acceptPending(id)}>Accept</button> <button className="btn btn-outline btn-error btn-wide" onClick={() => rejectPending(id)}>Reject</button></div> : null}
        
        {role === "patient" && props == "pendingappt"}
        
        {role === "patient" && props === "pastapt" ? reviewPopup(id) : null}
        {role === "patient" && props === "pastapt" ? reportPopup(id) : null}
        {role === "doctor" && props === "pastapt" ? reportPopup(id) : null}
      </div>
    </div>
  );
};

export default Card;