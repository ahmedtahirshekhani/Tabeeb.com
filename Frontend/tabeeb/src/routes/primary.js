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
		path: "/dashboard/admin",
		element: <AdminDashboard />,
	},
]);
export default router;
