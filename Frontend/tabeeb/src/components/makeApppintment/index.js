import { useEffect, useState } from "react";
import {
	makeAppointmentAuth,
	fetchServiceDataAuth,
} from "../../services/utils/auth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MakeAppointmentComponent = (props) => {
  const location = useLocation();
	const [doctorEmail, setdoctorEmail] = useState(location.state.docEmail);
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [daysDoctor, setDaysDoctor] = useState(["Mon", "Tue", "Wed"]);
	const [dayPatient, setDayPatient] = useState("");
	const [timePatient, setTimePatient] = useState("");
	const [rate, setRate] = useState(0);
	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");
	const [listTimes, setListTimes] = useState([]);
	const [reviews, setReviews] = useState([]);
  const [avgReview, setAvgReview] = useState(0) ;
  const navigate = useNavigate()

	const getWeek = () => {
		Date.prototype.addDays = function (days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};
		const date = new Date();
		const dayindex = date.getDay() - 1;
		let dict = {};
		let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
		let t = 0;
		for (let i = dayindex; i < dayindex + 7; i++) {
			let nextDay = i % 7;
			dict[days[nextDay]] = date.addDays(t);
			dict[days[nextDay]] = dict[days[nextDay]].toISOString().split("T")[0];
			t += 1;
		}
		return dict;
	};

	function addMinutes(time, minutes) {
		var date = new Date(
			new Date("01/01/2015 " + time).getTime() + minutes * 60000
		);
		var tempTime =
			(date.getHours().toString().length == 1
				? "0" + date.getHours()
				: date.getHours()) +
			":" +
			(date.getMinutes().toString().length == 1
				? "0" + date.getMinutes()
				: date.getMinutes()) +
			":" +
			(date.getSeconds().toString().length == 1
				? "0" + date.getSeconds()
				: date.getSeconds());
		return tempTime;
	}

	const fetchData = async () => {
    console.log(location.state.docEmail)
		const serviceData = await fetchServiceDataAuth(role, location.state.docEmail);
    var starttime = serviceData["data"]["service_details"]["start_time"]
		var interval = "15";
		var endtime = serviceData["data"]["service_details"]["end_time"]
		var timeslots = [serviceData["data"]["service_details"]["start_time"]]
		while (starttime <= endtime) {
			starttime = addMinutes(starttime, interval);
      console.log()
			timeslots.push(starttime);
		}
    timeslots.pop()
		setdoctorEmail(location.state.docEmail);
		setStartTime(serviceData["data"]["service_details"]["start_time"]);
    setAvgReview(serviceData["data"]["average_rating"][0]['avg']);
		setEndTime(serviceData["data"]["service_details"]["end_time"]);
		setRate(serviceData["data"]["service_details"]["rate"]);
		const temp = serviceData["data"]["service_details"]["days"].split(",");
		setReviews(serviceData["data"]["doc_reviews"]);
		setDaysDoctor(temp);
		setListTimes(timeslots);
    console.log(daysDoctor)
	};

	useEffect(() => {
		fetchData();
	}, []);

	const submitForm = () => {
		console.log("hello", role);
		var temp = getWeek()[dayPatient] + " " + timePatient;

		makeAppointmentAuth(role, token, doctorEmail, temp)
			.then((res, err) => {
				console.log(res);
        if(window.confirm("Appointment successful")){
          navigate("/dashboard/patient/pendingappt")
        }
			})
			.catch((err) => {
        if (err.response.status == 422) {
          if (window.confirm(err.response.data)) {
            window.location.reload();
          }
        }
				console.log(err);
			});
	};

	return (
		<div>
			<div>Rate : {rate}</div>
			<div>Please select a day:</div>
			{daysDoctor.map((value, index) => {
				return (
					<div>
						<div class="flex items-center mb-4">
							<input
								id="default-radio-1"
								type="radio"
								value={value}
								name="default-radio"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								onChange={() => {
									setDayPatient(value);
								}}
							/>
							<label
								for="default-radio-1"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								{value + " "}
								{getWeek()[value]}
							</label>
						</div>
					</div>
				);
			})}

			<div>Please select a time:</div>
			{listTimes.map((value, index) => {
				return (
					<div>
						<div class="flex items-center mb-4">
							<input
								id="default-radio-2"
								type="radio"
								value={value}
								name="default-radio2"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								onChange={() => {
									setTimePatient(value);
								}}
							/>
							<label
								for="default-radio-2"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								{value}
							</label>
						</div>
					</div>
				);
			})}

			<div className="form-control mt-6">
				<button className="btn btn-primary" onClick={() => submitForm()}>
					Book Appointment
				</button>
			</div>
      <div>
        Average Ratings: {avgReview}/5
      </div>
			<div>Reviews:</div>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Review</th>
							<th>Rating</th>
						</tr>
					</thead>
					<tbody>
						{reviews.map((value, index) => {
							return (
								<tr>
									<th>{index}</th>
									<td>{value["review_text"]}</td>
									<td>{value["rating"]}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MakeAppointmentComponent;
