import { useEffect, useState } from "react";
import { loginAuth } from "../../services/utils/auth";
import SuccessAlert from "../alerts/success";
import ErrorAlert from "../alerts/error";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../../services/utils/auth";
const LoginComponent = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const role = props.role;
	const navigate = useNavigate();

	const login = () => {
		loginAuth(email, password, role)
			.then((res) => {
				console.log(res);
				if (res.status === 200 && res.data.success === true) {
					setSuccessAlert(true);
					//get token from response
					const token = res.data.token;

					//set JWT token to local
					localStorage.setItem("token", token);
					setAuthToken(token);
					navigate(`/dashboard/${role}`);
				} else {
					setErrorAlert(true);
				}
			})
			.catch((err) => {
				setErrorAlert(true);

				console.log(err);
			});
	};
	return (
		<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div className="card-body">
				{successAlert ? (
					<SuccessAlert message="User Successfully Logged In!" />
				) : null}
				{errorAlert ? <ErrorAlert message="Invalid Credentials!" /> : null}
				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input
						type="text"
						placeholder="email"
						className="input input-bordered"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						type="password"
						placeholder="password"
						className="input input-bordered"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label className="label">
						<a
							href="/login/forgotpassword"
							className="label-text-alt link link-hover"
						>
							Forgot password?
						</a>
					</label>
				</div>
				<div className="form-control mt-6">
					<button className="btn btn-primary" onClick={() => login()}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;
