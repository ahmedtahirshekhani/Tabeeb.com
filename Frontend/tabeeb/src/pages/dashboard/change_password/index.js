import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
import { useState } from "react";
import ErrorAlert from "../../../components/alerts/error";
import SuccessAlert from "../../../components/alerts/success";


const PasswordChange = (props) => {
    const [oldPassword, setOldPassword] = useState("");
	  const [NewPassword, setNewPassword] = useState("");
    const [NewPassword2, setNewPassword2] = useState("");
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const login = () => {
		
	};

    return (
    <div>
      <Header />
      <div className="hero min-h-screen bg-base-200">
      {successAlert ? (
					<SuccessAlert message="Changed Password Successfully!" />
				) : null}
				{errorAlert ? <ErrorAlert message="Invalid Password!" /> : null}
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Change Password!</h1>
            <p className="py-6 w-96">Enter your password Details</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Previous Password</span>
                </label>
                <input
                  type="text"
                  placeholder="previous password "
                  className="input input-bordered"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
            <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="text"
                  placeholder="new password "
                  className="input input-bordered"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Re Enter New Password</span>
                </label>
                <input
                  type="text"
                  placeholder="new password "
                  className="input input-bordered"
                  onChange={(e) => setNewPassword2(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={() => login()}>Enter</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordChange;
