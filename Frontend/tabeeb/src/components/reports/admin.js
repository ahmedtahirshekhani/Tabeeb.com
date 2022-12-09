import React, { useEffect, useState } from "react";
import { viewReport } from "../../services/utils/reports";
import { handleBan } from "../../services/utils/reports";

const ViewReports = (dict) => {
	const reportDetails = [
		{
			report_id: 145,
			phone: 923456789,
			cnic: 42222222222,
			report_reason:
				"This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot",
		},
		{
			report_id: 666,
			phone: 923987654321,
			cnic: 4121212121,
			report_reason:
				"This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot",
		},
		{
			report_id: 777,
			phone: 923756478392,
			cnic: 42134222222,
			report_reason:
				"This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot",
		},
		{
			report_id: 888,
			phone: 923098971234,
			cnic: 4200000002,
			report_reason:
				"This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot",
		},
	];

	const [patientReport, setPatientReport] = useState([]);
	const [doctorReport, setDoctorReport] = useState([]);

	useEffect(() => {
		viewReport()
			.then((res) => {
				console.log(res);
				setPatientReport(res.data.patients);
				setDoctorReport(res.data.doctors);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const banUser = (role, reportid) => {
		console.log(role, reportid);
		// convert reportid to int
		let report_id = parseInt(reportid);
		handleBan(role, report_id)
			.then((res) => {
				if (res.status === 200) {
					console.log(res);

					if (window.confirm("User banned successfully")) {
						window.location.reload();
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="overflow-x-auto">
			<h1 style={{ padding: 1 + "em" }} class="text-center text-3xl">
				User Ban Reports
			</h1>
			<h2 style={{ padding: 1.5 + "em" }}>Reported by Doctors</h2>
			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th>Report ID</th>
						<th>Patient Phone Number</th>
						<th>Doctor CNIC</th>
						<th>Reasoning behind report</th>
					</tr>
				</thead>
				<tbody>
					{patientReport.map((value, index) => {
						return (
							<tr className="hover">
								<td>{value["report_id"]}</td>
								<td>{value["patient_phone"]}</td>
								<td>{value["d_cnic"]}</td>
								<td>{value["report_reason"]}</td>
								<td>
									<button
										className="btn btn-outline btn-accent"
										onClick={() => banUser("patients", value["report_id"])}
									>
										Ban
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<h2 style={{ padding: 1.5 + "em" }}>Reported by Patients</h2>
			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th>Report ID</th>
						<th>Doctor Phone Number</th>
						<th>Patient CNIC</th>
						<th>Reasoning behind report</th>
					</tr>
				</thead>
				<tbody>
					{doctorReport.map((value, index) => {
						return (
							<tr className="hover">
								<td>{value["report_id"]}</td>
								<td>{value["patient_phone"]}</td>
								<td>{value["d_cnic"]}</td>
								<td>{value["report_reason"]}</td>
								<td>
									<button
										className="btn btn-outline btn-accent"
										onClick={() => banUser("doctors", value["report_id"])}
									>
										Ban
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ViewReports;
