import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendReview } from "../../services/utils/review";
import { sendReport } from "../../services/utils/review";
import { useNavigate } from "react-router-dom";

const ReportIt2 = () => {
  const [report, setReport] = useState("")
  const location = useLocation();
  const [id, setId] = useState(0);
  const [dcnic, setDcnic] = useState("");
  const [phone, setPhone] = useState(0)
  const navigate = useNavigate();


  useEffect(() => {
    setPhone(location.state.phone);
    setId(location.state.id)
    console.log("id", id);
  }, []);
  const getReport = () => {
    return (
      <div>
        <h1 className="text-5xl text-center font-bold"> Report Patient for Appointment ID: {id}: </h1>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Report Reason</span>
          </label>
          <input
            type="text"
            placeholder="Report"
            className="input input-bordered"
            onChange={(e) => setReport(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={() => reportSubmit()}>
          Submit Report
        </button>
      </div>
    );
  };
  const reportSubmit = () => {
    sendReport(report, phone)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (window.confirm("Report sent successfully")) {
            navigate("/dashboard/doctor/pastappt");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return getReport();
};

export default ReportIt2;
