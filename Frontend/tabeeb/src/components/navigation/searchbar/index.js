import { useEffect, useState } from "react";
import "../../../assets/styles/searchbar.css";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [doctorsInfo, setDoctorsInfo] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				//const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
				//setDoctorsInfo(data.results)
				const data = [
					{ name: "Shozab" },
					{ name: "Shekhani" },
					{ name: "ali" },
				];
				setDoctorsInfo(data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [query]);

	return (
		<div className="form-control">
			<input
				type="text"
				placeholder="Search"
				className="input input-bordered"
				tabIndex={0}
				onChange={(e) => setQuery(e.target.value)}
			/>

			<ul className="menu shadow bg-base-100 rounded-box w-52 search-dropdown">
				{doctorsInfo.map((item) => {
					return (
						<li>
							<a>{item.name}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SearchBar;
