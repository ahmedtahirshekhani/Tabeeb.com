import { useEffect, useState } from "react";
import "../../../assets/styles/searchbar.css";
import { searchAuth } from "../../../services/utils/auth";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [doctorsInfo, setDoctorsInfo] = useState([]);
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");

	const search = () => {
		setDoctorsInfo([])
		searchAuth(role, token, query)
			.then((res, err) => {

				const data = res.data;

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

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			//const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
	// 			//setDoctorsInfo(data.results)
	// 			const data = [
	// 				{ name: "Shozab" },
	// 				{ name: "Shekhani" },
	// 				{ name: "ali" },
	// 			];
	// 			setDoctorsInfo(data);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};

	// 	fetchData();
	// }, [query]);

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
				{doctorsInfo.map((item) => {
						console.log(item)
						return (<li>
							<a>{item}</a>
						</li>)

				})}
			</ul>
		</div>
	);
};

export default SearchBar;
