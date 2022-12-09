import React, { useEffect, useState } from "react";
import { viewEarnRep } from "../../services/utils/reports";

const ViewEarnRep = () => {
	const [totalEarns, setTotalEarns] = useState(0);
	// const earnDetails = [
	// 	{ date_time: "20 Sept 2022", appointment_id: 1, charges: 500 },
	// 	{ date_time: "1 December 2021", appointment_id: 2, charges: 1500 },
	// 	{ date_time: "17 November 2022", appointment_id: 187, charges: 3000 },
	// 	{ date_time: "5 May 2023", appointment_id: 69, charges: 700 },
	// 	{ date_time: "7 July 2018", appointment_id: 9, charges: 350 },
	// ];
	const [earnDetails, setEarnDetails] = useState([]);

	useEffect(() => {
		const role = localStorage.getItem("role");
		const token = localStorage.getItem("token");
		viewEarnRep(role, token)
			.then((response) => {
				console.log(response);
				setTotalEarns(response.data.earnings);
				setEarnDetails(response.data.history);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="overflow-x-auto p-10">
			<h1 style={{ padding: 1 + "em" }} class="text-center text-3xl">
				Earnings Report
			</h1>
			<h3 style={{ padding: 1 + "em" }} class="text-center text-3xl">
				Total Earnings: Rs. {totalEarns}
			</h3>
			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th>Appointment Date</th>
						<th>Appointment ID</th>
						<th>Charges (in Rs.)</th>
					</tr>
				</thead>
				<tbody>
					{earnDetails.map((value, index) => {
						return (
							<tr className="hover">
								<td>{value["date_time"]}</td>
								<td>{value["appointment_id"]}</td>
								<td>{value["charges"]}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ViewEarnRep;
