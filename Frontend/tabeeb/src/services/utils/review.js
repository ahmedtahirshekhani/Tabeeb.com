import axios from "axios";
const sendReview = (rate, review, d_cnic, id) => {
	const rateint = parseInt(rate);
	console.log(rate, review, d_cnic, id);
	return new Promise((resolve, reject) => {
		const token = localStorage.getItem("token");

		const req = {
			rating: rateint,
			review: review,
			token: token,
			d_cnic: d_cnic,
			appointment_id: id,
		};
		const jsonReq = JSON.stringify(req);
		axios
			.post(`/api/v1/patient/review`, jsonReq, {
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

export { sendReview };
