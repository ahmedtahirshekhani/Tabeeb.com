import axios from "axios";
import { setAuthToken } from "./auth";

const viewEarnRep = (role, token) => {
	return new Promise((resolve, reject) => {
		// request content type json
		const req = {
			token: token,
		};
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/earningsReport`, jsonReq, {
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

const viewReport = () => {
	return new Promise((resolve, reject) => {
		// request content type json
		const role = localStorage.getItem("role");
		setAuthToken(localStorage.getItem("token"));
		axios
			.get(`/api/v1/${role}/reports`, {
				headers: {
					"ngrok-skip-browser-warning": "true",
					"cache-control": "no-cache",
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

const handleBan = (role, report_id) => {
	return new Promise((resolve, reject) => {
		// request content type json
		const req = {
			token: localStorage.getItem("token"),
			report_id: report_id,
			role: role,
		};
		// convert req to json
		const jsonReq = JSON.stringify(req);
		const tokenRole = localStorage.getItem("role");
		axios
			.post(`/api/v1/${tokenRole}/banUser`, jsonReq, {
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

export { viewEarnRep, viewReport };
