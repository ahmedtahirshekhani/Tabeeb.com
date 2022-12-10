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
// import DoctorDashboard from "../pages/dashboard/doctor";
// import PatientDashboard from "../pages/dashboard/patient";

import PrescriptionHist from "../pages/prescription/history";
import DoctorSignUpRequests from "../pages/doctorSignUpRequests";

import DashboardLayout from "../pages/dashboard";
import DoctorProfile from "../pages/viewprofile/doctor";
import PatientProfile from "../pages/viewprofile/patient";
// import CurrentApptPatient from "../pages/viewcurrappt/patient";
// import CurrentApptDoctor from "../pages/viewcurrappt/doctor";
// import PastApptPatient from "../pages/viewpastappt/patient";
// import PastApptDoctor from "../pages/viewpastappt/doctor";
// import MakeAppointment from "../pages/makeAppointment";
import PendingAppointments from "../pages/viewPendingAppointments";
import DoctorService from "../pages/services";
import Wallet from "../components/wallet";
import PatientCard from "../components/patientcard";

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
	// 	path: "/dashboard/patient/makeAppointment",
	// 	element: <MakeAppointment />,
	// },
	{
		path: "/dashboard/admin/doctorsignuprequests",
		element: <DoctorSignUpRequests />,
	},
	{
		path: "/profile/doctor",
		element: <DoctorProfile />,
	},
	{
		path: "/profile/patient",
		element: <PatientProfile />,
	},

	{
		path: "/dashboard/doctor/prescriptionhistory",
		element: <PrescriptionHist />,
	},
	{
		path: "/dashboard/doctor/service",
		element: <DoctorService />,
	},
	{
		path: "/wallet",
		element: <Wallet />,
	},
	{
		path: "/patientdashboard",
		element: <PatientCard />,
	},
	{
		path: "/temp/:patient",
		element: <DashboardLayout />,
	},
]);
export default router;
