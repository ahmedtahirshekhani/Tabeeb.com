import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendReview } from "../../services/utils/review";

const ReviewIt = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const location = useLocation();
  const [id, setId] = useState(0);
  const [dcnic, setDcnic] = useState("");

  useEffect(() => {
    setId(location.state.appointment_id);
    setDcnic(location.state.dcnic);
    console.log("id", id);
  }, []);
  const getReview = () => {
    return (
      <div>
        <h1 className="text-5xl text-center font-bold">Add Review for Appointment ID: {id}</h1>
        <div className="dropdown dropdown-hover p-5">
          <select
            className="select select-info w-full max-w-xs"
            onChange={(e) => setRate(e.target.value)}
          >
            <option disabled selected>
              Rate Doctor{" "}
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Add Review</span>
          </label>
          <input
            type="text"
            placeholder="Review"
            className="input input-bordered"
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={() => reviewSubmit()}>
          Submit Review
        </button>
      </div>
    );
  };
  const reviewSubmit = () => {
    sendReview(rate, review, dcnic, id)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (window.confirm("Review sent successfully")) {
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return getReview();
};

export default ReviewIt;
