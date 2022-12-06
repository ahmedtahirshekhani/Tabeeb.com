import axios from "axios";
import { setAuthToken } from "./auth";

const getDoctors = (role, token) => {
	//console.log("Calling the Api for getDoctors");
	return new Promise((resolve, reject) => {
		setAuthToken(localStorage.getItem("token"));
		axios
			.get("/api/v1/admin/home", {
				headers: {
					"ngrok-skip-browser-warning": "true",
					"cache-control": "no-cache",
				},
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
	// return new Promise((resolve, reject) => {
	// 	resolve({
	// 		data: {
	// 			data: [],
	// 		},
	// 	});
	// });
};

const acceptRejectDoctor = (cnic, token, task) => {
	return new Promise((resolve, reject) => {
		const req = {
			token: token,
			cnic: cnic,
		};
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/admin/${task}Request`, jsonReq, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res);
				console.log("Success");
				resolve(res);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};

export { getDoctors, acceptRejectDoctor };
