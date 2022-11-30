import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../pages/error";
import Login from "../pages/authentication/login";
import DoctorLogin from "../pages/authentication/login/doctor";
import PatientLogin from "../pages/authentication/login/patient";
import AdminLogin from "../pages/authentication/login/admin";
import Signup from "../pages/authentication/signup";
import DoctorSignup from "../pages/authentication/signup/doctor";
import PatientSignup from "../pages/authentication/signup/patient";
import ForgotPassword from "../pages/authentication/login/forgotPassword";
import AdminDashboard from "../pages/dashboard/admin";
import PasswordChange from "../pages/dashboard/change_password";
import DoctorDashboard from "../pages/dashboard/doctor";
import PatientDashboard from "../pages/dashboard/patient";

import PrescriptionHist from "../pages/prescription/history";

import DoctorProfile from "../pages/viewprofile/doctor";
import PatientProfile from "../pages/viewprofile/patient";
import CurrentApptPatient from "../pages/viewcurrappt/patient";
import CurrentApptDoctor from "../pages/viewcurrappt/doctor";
import PastApptPatient from "../pages/viewpastappt/patient";
import PastApptDoctor from "../pages/viewpastappt/doctor";
import MakeAppointment from "../pages/makeAppointment";
import PendingAppointments from "../pages/viewPendingAppointments";

import DashboardLayout from "../pages/dashboard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/login/doctor",
		element: <DoctorLogin />,
	},
	{
		path: "/login/patient",
		element: <PatientLogin />,
	},
	{
		path: "/login/admin",
		element: <AdminLogin />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/signup/doctor",
		element: <DoctorSignup />,
	},
	{
		path: "/signup/patient",
		element: <PatientSignup />,
	},
	{
		path: "/login/forgotpassword",
		element: <ForgotPassword />,
	},

	{
		path: "/dashboard/change_password",
		element: <PasswordChange />,
	},
	{

		path: "/dashboard/:role",
		element: <DashboardLayout />,
		exact: true,
	},
	{
		path: "/dashboard/:role/:func",
		element: <DashboardLayout />,
		exact: true,
	},


	// {
	// 	path: "/dashboard/patient/currentappt",
	// 	element: <CurrentApptPatient />,
	// },
	// {
	// 	path: "/dashboard/doctor/currentappt",
	// 	element: <CurrentApptDoctor />,
	// },
	// {
	// 	path: "/dashboard/patient/pastappt",
	// 	element: <PastApptPatient />,
	// },
	// {
	// 	path: "/dashboard/doctor/pastappt",
	// 	element: <PastApptDoctor />,
	// },
	// {
	// 	path: "/dashboard/makeAppointment",
	// 	element: <MakeAppointment />,
	// },
	// {
	// 	path: "/dashboard/patient/currentappt",
	// 	element: <CurrentApptPatient />,
	// },
	// {
	// 	path: "/dashboard/doctor/currentappt",
	// 	element: <CurrentApptDoctor />,
	// },
	// {
	// 	path: "/dashboard/patient/pastappt",
	// 	element: <PastApptPatient />,
	// },
	// {
	// 	path: "/dashboard/doctor/pastappt",
	// 	element: <PastApptDoctor />,
	// },
	// {
	// 	path: "/dashboard/makeAppointment",
	// 	element: <MakeAppointment />,
	// },
	{
		path: "/profile/doctor",
		element: <DoctorProfile />,
	},
	{
		path: "/profile/patient",
		element: <PatientProfile />,

	},
	{
		path: "/dashboard/pendingAppointments",
		element: <PendingAppointments />,
	},
	{
		path:"/dashboard/doctor/prescriptionhistory",
		element: <PrescriptionHist />
	}
]);
export default router;
