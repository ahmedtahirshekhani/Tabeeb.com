import Footer from "../../../../layouts/Footer";
import Header from "../../../../layouts/Header";
import LoginComponent from "../../../../components/login";

const PatientSignup = () => {
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
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>Email Address</span>
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="input input-bordered input-sm "
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
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>Password</span>
                  <input
                    type="text"
                    placeholder="Password"
                    className="input input-bordered input-sm"
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
                  />
                </label>
              </div>


              <div className="form-control">
                <label className="input-group input-group-sm input-group-vertical">
                  <span>City</span>
                  <input
                    type="text"
                    placeholder="City"
                    className="input input-bordered input-sm"
                  />
                </label>
              </div>
            
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
