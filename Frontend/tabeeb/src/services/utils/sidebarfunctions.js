import axios from "axios";

const getCurrentAppt = (role, token) => {
	return new Promise((resolve, reject) => {
		const req = {
			token: token,
		};
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/acceptedAppointments`, jsonReq, {
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
const getPastAppt = (role, token) => {
	return new Promise((resolve, reject) => {
		const req = {
			token: token,
		};
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/pastAppoitments`, jsonReq, {
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

export { getCurrentAppt, getPastAppt };
