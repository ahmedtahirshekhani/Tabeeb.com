import DashboardNavbar from "../../../components/navigation/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { viewProfileAuth } from "../../../services/utils/auth";
import { editProfileAuth } from "../../../services/utils/auth";

const PatientProfile = () => {

	const [patientInfo, setPatientInfo] = useState({})
    const [formState, setFormState] = useState(false);
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");

	useEffect(() => {
		console.log("Patient View Profile");
		viewProfileAuth(role, token)
		.then((res, err) => {
			console.log(res.data[0]);
			setPatientInfo(res.data[0])
		})
		.catch((err) => {
			console.log(err);
		});

	}, []);

    const editProfile = () => {
		editProfileAuth(role,token, patientInfo['full_name'], patientInfo['city'], 'null', 'null')
		.then((res, err) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});

		window.location.reload();
	};

    const editProfileForm = () => {
		console.log("edit profile form called");
		return (
			<div>
				<div className="hero min-h-screen bg-base-200">
					<div className="hero-content flex-col lg:flex-row-reverse">
						<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
							<div className="card-body">
								<div className="form-control"></div>
								<div className="form-control">
									<label className="input-group input-group-sm input-group-vertical">
										<span>Name</span>
										<input
											type="text"
											placeholder="Name"
											className="input input-bordered input-sm"
											onChange={(e) => {
												patientInfo['full_name'] = e.target.value
												setPatientInfo(patientInfo)
											}}
										/>
									</label>
								</div>
								<div className="form-control">
									<div className="input-group">
										<select
											className="select select-bordered"
											onChange={(e) => {
												patientInfo['city'] = e.target.value
												setPatientInfo(patientInfo)
											}}
										>
											<option disabled selected defaultValue="None">
												City
											</option>
											<option value="Karachi">Karachi</option>
											<option value="Lahore">Lahore</option>
											<option value="Islamabad">Islamabad</option>
										</select>
									</div>
								</div>

								<div className="form-control mt-6">
									<button
										href=" "
										className="btn btn-primary"
										onClick={() => {
											editProfile();
										}}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<DashboardNavbar name='Patient Dashboard' />
            <div >
                <div>
                    Email : {patientInfo['email']}
                </div>
                <div>
                    Phone : {patientInfo['phone_number']}
                </div>
                <div>
                    Full Name : {patientInfo['full_name']}
                </div>
                <div>
                    Wallet Amount : {patientInfo['wallet_amount']}
                </div>
				<div>
                    City : {patientInfo['city']}
                </div>
            </div>

            <div>
				<button
					className="btn"
					onClick={() => {
						setFormState(!formState);
					}}
				>
					Edit Profile
				</button>
			</div>

			<div>{formState && editProfileForm()}</div>
		</>
	);
};

export default PatientProfile;
