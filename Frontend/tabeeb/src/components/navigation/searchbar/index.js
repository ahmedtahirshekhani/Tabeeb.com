import { useEffect, useState } from "react";
import "../../../assets/styles/searchbar.css";
import { searchAuth } from "../../../services/utils/auth";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [doctorsInfo, setDoctorsInfo] = useState([]);
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");
	const [queryInfo, setQueryInfo] = useState("") ;
	const navigate = useNavigate();

	const search = () => {
		setDoctorsInfo([])
		searchAuth(role, token, query)
			.then((res, err) => {

				const data = res.data;
				setQueryInfo(data)
				var myList = [];
				data.map((item) => {
					myList.push(item.full_name);
				});

				// myList = ['shozab', 'ali', 'jazzi']
				console.log('mylit', myList)
				setDoctorsInfo(myList);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const submitSearch = (email) => {
		console.log(email)
		// setQuery('')
		// setDoctorsInfo([])
		console.log("no navigate")
		navigate("/dashboard/patient/makeAppointment",
            {
              state: {
                docEmail: email
              },
            })
		window.location.reload()
	}

	return (
		<div className="form-control">
			<input
				type="text"
				placeholder="Search"
				className="input input-bordered text-white"
				tabIndex={0}
				onChange={(e) => {
					if(e.target.value.length >0){
						setQuery(e.target.value);
						search();
					}else {
						setQuery('')
						setDoctorsInfo([])
					}

				}}
			/>

			<ul className="menu shadow bg-base-100 rounded-box w-52 search-dropdown">
				{doctorsInfo.map((item,index) => {
						return (
						<li>
							<div className="clickBox" onClick={() => {submitSearch(queryInfo[index]['email'])}}>
								<a>{item}</a>
							</div>
						</li>)

				})}
			</ul>
		</div>
	);
};

export default SearchBar;
