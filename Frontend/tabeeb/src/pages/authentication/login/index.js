import Header from "../../../layouts/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      navigate(`/dashboard/${role}`);
    }
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold">LOGIN</h1>

              <div className="mt-5 ...">
                <div className="flex flex-col space-y-10 ...">
                  <div className="dropdown ">
                    <label tabIndex={0} className="btn btn-primary">
                      Login As:
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a href={"/login/doctor"}>Doctor</a>
                      </li>
                      <li>
                        <a href={"/login/patient"}>Patient</a>
                      </li>
                      <li>
                        <a href={"/login/admin"}>Admin</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
