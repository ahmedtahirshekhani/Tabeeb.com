import { useEffect, useState } from "react";


const MakeAppointmentComponent = (props) => {
    const [doctorEmail, setdoctorEmail] = useState("");
	const [patientEmail, setpatientEmail] = useState("");
    const [date, setDate] = useState("");
	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Patient Email</span>
        </label>
        <input
          type="email"
          placeholder="patient email"
          className="input input-bordered"
          onChange={(e) => setpatientEmail(e.target.value)}

        />
      </div>

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
          type="date"
          placeholder="date"
          className="input input-bordered"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-control mt-6">
        <button className="btn btn-primary">
          Submit Details
        </button>
      </div>
    </div>
  );
};

export default MakeAppointmentComponent;
