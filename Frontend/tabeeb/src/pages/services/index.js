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
	const [days, setDays] = useState([-1,-1,-1,-1,-1,-1,-1]);
	const [rate, setRate] = useState(0);
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");
	const daysArray = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

	const docService = () => {
		console.log("Calling the Api for make service");
		let daysToSend = ""
		for (let i = 0; i < 7; i++) {
			if(days[i] > 0){
				if(daysToSend == "") {
					daysToSend = daysToSend + daysArray[i]
				}else{
					daysToSend = daysToSend + "," + daysArray[i]
				}
			}
		}
		console.log(daysToSend)
		doctorServiceAuth(
			role,
			token,
			start_time,
			end_time,
			daysToSend,
			rate
		)
			.then((res, err) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
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
							<div className="form-control"></div>

							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>Start Time</span>
									<input
										type="time"
										placeholder="12:10"
										className="input input-bordered input-sm "
										onChange={(e) => setStart_time(e.target.value)}
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
										onChange={(e) => setEnd_time(e.target.value)}
									/>
								</label>
							</div>

							<div>Days</div>
							<div class="flex justify-center">
								<div>
									{daysArray.map((value, index) => {
										return (
											<div class="form-check">
												<input
													class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
													type="checkbox"
													value={index}
													id="flexCheckChecked"
													onChange={() => {
														const temp = days
														temp[index] = temp[index]*-1
														setDays(temp)
														console.log(days)
													}}
												/>
												<label
													class="form-check-label inline-block text-white"
													for="flexCheckChecked"
												>
													{value}
												</label>
											</div>
										);
									})}
								</div>
							</div>

							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>Rate</span>
									<input
										type="number"
										placeholder="100"
										className="input input-bordered input-sm"
										onChange={(e) => setRate(e.target.value)}
									/>
								</label>
							</div>

							<div className="form-control mt-6">
								<button
									className="btn btn-primary"
									onClick={() => docService()}
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorService;
