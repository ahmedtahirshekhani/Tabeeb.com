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
		// axios.post(`/api/v1/${role}/signup`, jsonReq, {
		//     headers: {
		//         'Content-Type': 'application/json'
		//     }
		// })
		//     .then(res => {
		//         console.log(res);
		//         console.log("Success")
		//         // localStorage.setItem('role', role);
		//         resolve(res);
		//     })
		//     .catch(err => {
		//         console.log(err);
		//         reject(err);
		//     });
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

export { loginAuth, signup, setAuthToken };
