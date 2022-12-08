import DashboardNavbar from "../../components/navigation/dashboard";
import MakeAppointmentComponent from "../../components/makeApppintment";
import { useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/sidebar";

const MakeAppointment = () => {
	//   useEffect(() => {
	//     console.log("Doctor Dashboard");
	//     axios
	//       .get("/api/v1/doctor/home", {
	//         headers: {
	//           "ngrok-skip-browser-warning": "true",
	//           "cache-control": "no-cache",
	//         },
	//       })
	//       .then((res) => {
	//         console.log(res.data);
	//       });
	//   }, []);
	return (
		<>
			<div>
				<div>
					<div className="hero min-h-screen bg-base-200">
						<div className="hero-content flex-col ">
							<div className="text-center lg:text-left">
								<div className="indicator">
									<span className="indicator-item badge badge-primary">
										Patient
									</span>
									<h1 className="text-5xl font-bold">Make an Appointment!</h1>
								</div>
								<p className="py-6 w-96">
									Enter the required details to proceed!
								</p>
							</div>
							<MakeAppointmentComponent />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MakeAppointment;
