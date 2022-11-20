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
		axios.post(`/api/v1/${role}/signup`, jsonReq, {
		    headers: {
		        'Content-Type': 'application/json'
		    }
		})
		    .then(res => {
		        console.log(res);
		        console.log("Success")
		        // localStorage.setItem('role', role);
		        resolve(res);
		    })
		    .catch(err => {
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
		console.log(role)
		const req = {
			token: token,
			oldPassword: oldPassword,
			newPassword: NewPassword
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
}

const searchAuth = (role, token, search) => {
	return new Promise((resolve, reject) => {
		// request content type json
		console.log("Calling the Api for search");
		console.log(role)
		const req = {
			token: token,
			search: search
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
}

export { loginAuth, signup, setAuthToken, changePasswordAuth, searchAuth };
