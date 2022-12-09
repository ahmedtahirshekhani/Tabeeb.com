import axios from "axios";

const getTotalAmount = () => {
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		const req = {
			token: token,
		};
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/wallet`, jsonReq, {
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

const addAmount = (amount) => {
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");
	return new Promise((resolve, reject) => {
		const req = {
			token: token,
			balance: amount,
		};
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/${role}/update_wallet`, jsonReq, {
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

export { getTotalAmount, addAmount };
