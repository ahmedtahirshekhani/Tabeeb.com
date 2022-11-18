import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from "./routes/Root";
import ErrorPage from "./pages/error";
import Login from './pages/authentication/login';
import DoctorLogin from './pages/authentication/login/doctor';
import PatientLogin  from './pages/authentication/login/patient';
import AdminLogin from './pages/authentication/login/admin';    
import Signup from './pages/authentication/signup';
import DoctorSignup from './pages/authentication/signup/doctor';
import PatientSignup from './pages/authentication/signup/patient';
import ForgotPassword from './pages/authentication/login/forgotPassword';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
