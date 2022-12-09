import Header from "../../../../layouts/Header";
import { signup } from "../../../../services/utils/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorSignup = () => {
	const [pmc, setPmc] = useState("");
	const [cnic, setCnic] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [fullName, setFullName] = useState("");
	const [aboutDoc, setAboutDoc] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const navigate = useNavigate();
	const docSignup = () => {
		console.log("Calling the Api for signup");
		const req = {
			pmc_reg: pmc,
			cnic: cnic,
			email: email,
			password: password,
			phone_number: phone,
			name: fullName,
			about_doctor: aboutDoc,
			street_address: address,
			city: city,
		};
		signup(req, "doctor")
			.then((res) => {
				console.log(res);
				console.log("Success");
				navigate(`/`);
				// localStorage.setItem('role', role);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<Header />
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<div className="indicator">
							<span className="indicator-item badge badge-primary">Doctor</span>
							<h1 className="text-5xl font-bold">Signup now!</h1>
						</div>
						<p className="py-6 w-96">
							Enter required details to sign up for Tabeeb!
						</p>
					</div>
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<div className="card-body">
							<div className="form-control"></div>
							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>PMC Registration Number</span>
									<input
										type="text"
										placeholder="PMC"
										className="input input-bordered input-sm "
										onChange={(e) => setPmc(e.target.value)}
									/>
								</label>
							</div>

							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>Phone Number</span>
									<input
										type="text"
										placeholder="02131234567"
										className="input input-bordered input-sm "
										onChange={(e) => setPhone(e.target.value)}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>Email Address</span>
									<input
										type="email"
										placeholder="Email Address"
										className="input input-bordered input-sm "
										onChange={(e) => setEmail(e.target.value)}
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
										onChange={(e) => setFullName(e.target.value)}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>Password</span>
									<input
										type="password"
										placeholder="Password"
										className="input input-bordered input-sm"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>CNIC</span>
									<input
										type="text"
										placeholder="CNIC"
										className="input input-bordered input-sm"
										onChange={(e) => setCnic(e.target.value)}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="input-group input-group-sm input-group-vertical">
									<span>About Doctor</span>
									<input
										type="text"
										placeholder="About"
										className="input input-bordered input-sm"
										onChange={(e) => setAboutDoc(e.target.value)}
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
										onChange={(e) => setAddress(e.target.value)}
									/>
								</label>
							</div>

							<div className="form-control">
								<div className="input-group">
									<select
										className="select select-bordered"
										onChange={(e) => setCity(e.target.value)}
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
								<button className="btn btn-primary" onClick={() => docSignup()}>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorSignup;
