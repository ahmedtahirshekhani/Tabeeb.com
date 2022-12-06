import React from "react";
import { sideBarAdmin } from "./sideBarAdmin";
import { sideBarPatient } from "./sideBarPatient";
import { sideBarDoctor } from "./sideBarDoctor";
import "../../assets/styles/sidebar.css";
const helper = (role) => {
	let obj3 = {};
	if (role === "admin") {
		obj3 = sideBarAdmin;
	} else if (role === "patient") {
		obj3 = sideBarPatient;
	} else if (role === "doctor") {
		obj3 = sideBarDoctor;
	}
	const listOfItems = [];

	obj3.map((val, key) => {
		listOfItems.push(
			<li
				key={key}
				onClick={() => {
					window.location.pathname = val.link;
				}}
			>
				{" "}
				<div>{val.title}</div>
			</li>
		);
		return obj3;
	});

	return listOfItems;
};
function SideBar(props) {
	const role = props.role;
	return (
		<div>
			<div>
				<ul className="menu p-4 w-80 bg-base-100 text-base-content">
					{helper(role)}
				</ul>
			</div>
		</div>
	);
}

export default SideBar;
