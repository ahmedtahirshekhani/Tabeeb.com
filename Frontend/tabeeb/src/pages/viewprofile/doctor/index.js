import DashboardNavbar from "../../../components/navigation/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { viewProfileAuth } from "../../../services/utils/auth";
import { useNavigate } from "react-router-dom";
import { editProfileAuth } from "../../../services/utils/auth";

const DoctorProfile = () => {

	const [doctorInfo, setDoctorInfo] = useState({})
	const [formState, setFormState] = useState(false);
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");

	useEffect(() => {
		viewProfileAuth(role, token)
		.then((res, err) => {
			console.log(res.data[0]);
			setDoctorInfo(res.data[0])
		})
		.catch((err) => {
			console.log(err);
		});

	}, []);

	const editProfile = () => {
		console.log(doctorInfo['full_name'], doctorInfo['city'], doctorInfo['street_address'] , doctorInfo['about_doctor'] )
		editProfileAuth(role, token, doctorInfo['full_name'], doctorInfo['city'], doctorInfo['street_address'] , doctorInfo['about_doctor'] )
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
										<span>About Doctor</span>
										<input
											type="text"
											placeholder="About"
											className="input input-bordered input-sm "
											onChange={(e) => {
												doctorInfo['about_doctor'] = e.target.value
												setDoctorInfo(doctorInfo)
											}}
										/>
									</label>
								</div>
								<div className="form-control">
									<label className="input-group input-group-sm input-group-vertical">
										<span>Name</span>
										<input
											type="text"
											placeholder="Name"
											className="input input-bordered input-sm"
											onChange={(e) => {
												doctorInfo['full_name'] = e.target.value
												setDoctorInfo(doctorInfo)
											}}
										/>
									</label>
								</div>
								<div className="form-control">
									<label className="input-group input-group-sm input-group-vertical">
										<span>Street Address</span>
										<input
											type="text"
											placeholder="Street Address"
											className="input input-bordered input-sm"
											onChange={(e) => {
												doctorInfo['street_address'] = e.target.value
												setDoctorInfo(doctorInfo)
											}}
										/>
									</label>
								</div>

								<div className="form-control">
									<div className="input-group">
										<select
											className="select select-bordered"
											onChange={(e) => {
												doctorInfo['city'] = e.target.value
												setDoctorInfo(doctorInfo)
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
			<DashboardNavbar name="Doctor Dashboard" />
			<div>
				<div>CNIC : {doctorInfo["cnic"]}</div>
				<div>Email : {doctorInfo["email"]}</div>
				<div>Phone : {doctorInfo["phone_number"]}</div>
				<div>Full Name : {doctorInfo["full_name"]}</div>
				<div>About : {doctorInfo["about_doctor"]}</div>
				<div>Address : {doctorInfo["street_address"]}</div>
				<div>City : {doctorInfo["city"]}</div>
				<div>PMC Registration : {doctorInfo["pmc_reg"]}</div>
				<div>Banned :{doctorInfo["isBanned"] == 0 ? " No" : " Yes"}</div>
				<div>Verified :{doctorInfo["isVerified"] == 0 ? " No" : " Yes"}</div>
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

export default DoctorProfile;
