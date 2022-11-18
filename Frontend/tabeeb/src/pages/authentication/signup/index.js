import Footer from "../../../layouts/Footer";
import Header from "../../../layouts/Header";

const Signup = () => {
  return (
    <div>
      <Header />
      <div>
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold">SIGN UP</h1>

              <div className="mt-5 ...">
                <div className="flex flex-col space-y-10 ...">
                  <div className="dropdown ">
                    <label tabIndex={0} className="btn btn-primary">
                      Signup As:
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a href={'/signup/doctor'}>Doctor</a>
                      </li>
                      <li>
                        <a href={'/signup/patient'}>Patient</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
