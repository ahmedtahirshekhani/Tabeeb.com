import { useEffect, useState } from "react";
import { makeAppointmentAuth } from "../../services/utils/auth";


const MakeAppointmentComponent = (props) => {
  const [doctorEmail, setdoctorEmail] = useState("");
  const [date, setDate] = useState("");
	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const submitForm = () => {
    console.log("hello", role)
    console.log(date)
    makeAppointmentAuth(role, token, doctorEmail, date)
    .then((res, err) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Doctor Email</span>
        </label>
        <input
          type="email"
          placeholder="doctor email"
          className="input input-bordered"
          onChange={(e) => setdoctorEmail(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Appointment Date</span>
        </label>
        <input
          type="datetime-local"
          placeholder="date"
          className="input input-bordered"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-control mt-6">
        <button className="btn btn-primary" onClick={() => submitForm()}>
          Submit Details
        </button>
      </div>
    </div>
  );
};

export default MakeAppointmentComponent;
