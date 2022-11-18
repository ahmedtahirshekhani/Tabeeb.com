import Footer from "../../../../layouts/Footer";
import Header from "../../../../layouts/Header";
import LoginComponent from "../../../../components/login"

const AdminLogin = () => {
  return (
    <div>
      <Header />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <div className="indicator">
              <span className="indicator-item badge badge-primary">Admin</span>
              <h1 className="text-5xl font-bold">Login now!</h1>
            </div>
            <p className="py-6 w-96">Enter username and password to login!</p>
          </div>
          <LoginComponent role="admin"/>
          
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
