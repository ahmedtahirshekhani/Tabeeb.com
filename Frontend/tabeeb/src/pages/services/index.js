import DashboardNavbar from "../../components/navigation/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { viewProfileAuth } from "../../services/utils/auth";
import { useNavigate } from "react-router-dom";
import { editProfileAuth } from "../../services/utils/auth";
import { doctorServiceAuth } from "../../services/utils/auth";

const DoctorService = () => {

    const [start_time, setStart_time] = useState("");
    const [end_time, setEnd_time] = useState("");
    const [days, setDays] = useState("");
    const [rate, setRate] = useState(0);
    const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");

    const docService = () => {
      console.log("Calling the Api for make service")
        doctorServiceAuth(role, token, '21:00', '22:00', 'Mon,Tue,Wed,Thur,Fri,Sat,Sun', rate)
        .then((res, err) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    }
    return (
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <div className="indicator">
                <span className="indicator-item badge badge-primary">Doctor</span>
                <h1 className="text-5xl font-bold">Make Service!</h1>
              </div>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                </div>

                <div className="form-control">
                  <label className="input-group input-group-sm input-group-vertical">
                    <span>Start Time</span>
                    <input
                      type="time"
                      placeholder="12:10"
                      className="input input-bordered input-sm "
                      onChange = {(e) => setStart_time(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="input-group input-group-sm input-group-vertical">
                    <span>End Time</span>
                    <input
                      type="time"
                      placeholder="12:10"
                      className="input input-bordered input-sm "
                      onChange = {(e) => setEnd_time(e.target.value)}
                    />
                  </label>
                </div>

                <div className="form-control">
                  <div className="input-group">
                    <select className="select select-bordered" onChange={(e)=>setDays(e.target.value)}>
                      <option disabled selected defaultValue="None" >Days</option>
                      <option value = "Monday">Monday</option>
                      <option value="Teusday">Teusday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value ="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="input-group input-group-sm input-group-vertical">
                    <span>Rate</span>
                    <input
                      type="number"
                      placeholder="100"
                      className="input input-bordered input-sm"
                      onChange = {(e) => setRate(e.target.value)}
                    />
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={()=>docService()}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default DoctorService;
