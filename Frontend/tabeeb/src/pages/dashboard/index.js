import { useEffect, useState } from "react";
import DashboardNavbar from "../../components/navigation/dashboard";
import SideBar from "../../components/sidebar";

const DashboardLayout = () => {
	const role = localStorage.getItem("role");

	return (
		<div>
			<DashboardNavbar name={role} />
			<SideBar role={role} />
		</div>
	);
};

export default DashboardLayout;
