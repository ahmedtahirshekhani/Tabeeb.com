import axios from "axios";
const loginAuth = (email, password, role) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for login");
		const req = {
			email: email,
			password: password,
		};
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/login`, jsonReq, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res);
				console.log("Success");
				localStorage.setItem("role", role);
				resolve(res);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
		// const res = {
		// 	status: 200,
		// 	data: {
		// 		success: true,
		// 		message: "User successfully logged in",
		// 	},
		// };
		// resolve(res);
	});
};

const signup = (obj, role) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for login");
		const req = obj;
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/signup`, jsonReq, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res);
				console.log("Success");
				// localStorage.setItem('role', role);
				resolve(res);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};

const setAuthToken = (token) => {
	if (token) {
		console.log("Setting token");
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

const changePasswordAuth = (oldPassword, NewPassword, role, token) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for change Password");
		console.log(role);
		const req = {
			token: token,
			oldPassword: oldPassword,
			newPassword: NewPassword,
		};
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/changePassword`, jsonReq, {
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

const searchAuth = (role, token, search) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for search");
		console.log(role);
		const req = {
			token: token,
			search: search,
		};
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/search`, jsonReq, {
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

const makeAppointmentAuth = (role, token, doctor_email, datetime) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for make appointment");
		console.log(role);
		const req = {
			token: token,
			doctor_email: doctor_email,
			datetime: datetime,
		};
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/makeAppointment`, jsonReq, {
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

const viewProfileAuth = (role, token) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for view profile");
		console.log(role);
		const req = {
			token: token,
		};

		// convert req to json
		const jsonReq = JSON.stringify(req);

		axios
			.post(`/api/v1/${role}/profile`, jsonReq, {
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

const editProfileAuth = (
	role,
	token,
	full_name,
	city,
	street_address,
	about_doctor
) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for edit profile");
		console.log(role);
		var req = {};
		if (role == "doctor") {
			req = {
				token: token,
				full_name: full_name,
				city: city,
				street_address: street_address,
				about_doctor: about_doctor,
			};
		} else if (role == "patient") {
			req = {
				token: token,
				full_name: full_name,
				city: city,
			};
		}

		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/editProfile`, jsonReq, {
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

const doctorServiceAuth = (role, token, start_time, end_time, days, rate) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for doctor service");
		console.log(role);

		const req = {
			token: token,
			start_time: start_time,
			end_time: end_time,
			days: days,
			rate: rate,
		};

		console.log(req)
		// convert req to json
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/editService`, jsonReq, {
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

export {
	loginAuth,
	signup,
	setAuthToken,
	changePasswordAuth,
	searchAuth,
	viewProfileAuth,
	editProfileAuth,
	doctorServiceAuth,
	makeAppointmentAuth,
};
