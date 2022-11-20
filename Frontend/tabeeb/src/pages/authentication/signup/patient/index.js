import Footer from "../../../../layouts/Footer";
import Header from "../../../../layouts/Header";
import LoginComponent from "../../../../components/login";
import { signup } from "../../../../services/utils/auth";
import { useState } from "react";

const PatientSignup = () => {

  const [wallet, setWallet] = useState(0)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");

  const patSignup = ()=>{
    console.log("Calling the Api for signup")
    const req = {

      'phone_number':phone,
      'email':email,
      'name':fullName,
      'password':password,
      'city':city
    }

    signup(req, "patient").then(res=>{
      console.log(res);
      console.log("Success")
      // localStorage.setItem('role', role);
    }
    ).catch(err=>{
      console.log(err);
    }
    );
  }
  return (
    <div>
      <Header />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="indicator">
              <span className="indicator-item badge badge-primary">Patient</span>
              <h1 className="text-5xl font-bold">Signup now!</h1>
            </div>
            <p className="py-6 w-96">
              Enter required details to sign up for Tabeeb!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
              </div>


              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>Phone Number</span>
                  <input
                    type="text"
                    placeholder="02131234567"
                    className="input input-bordered input-sm "
                    onChange = {(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>Email Address</span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input input-bordered input-sm "
                    onChange = {(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered input-sm"
                    onChange = {(e) => setFullName(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered input-sm"
                    onChange = {(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>Wallet Amonunt</span>
                  <input
                    type="text"
                    placeholder="0-10,000"
                    className="input input-bordered input-sm"
                    onChange = {(e) => setWallet(e.target.value)}
                  />
                </label>
              </div>


              <div className="form-control">
                <div className="input-group">
                  <select className="select select-bordered" onChange={(e)=>setCity(e.target.value)}>
                    <option disabled selected defaultValue="None" >City</option>
                    <option value = "Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={()=>patSignup ()}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
