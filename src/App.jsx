// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const App = () => {
// 	const [countries, setCountry] = useState([]);
// 	const [selectCountry, setSelectCountry] = useState('');

// 	const [states, setStates] = useState([]);
// 	const [selectState, setSelectState] = useState('');

// 	const [cities, setCities] = useState([]);
// 	const [selectCities, setSelectCities] = useState('');

// 	//-----( Country )----------
// 	const getCountry = async () => {
// 		let { data } = await axios.get(
// 			'https://crio-location-selector.onrender.com/countries',
// 		);
// 		setCountry(data);
// 	};

// 	const handleCountryChange = (e) => {
// 		setSelectCountry(e.target.value);
// 	};

// 	useEffect(() => {
// 		getCountry();
// 	}, []);

// 	//-----( State )----------
// 	const getState = async () => {
// 		let { data } = await axios.get(
// 			` https://crio-location-selector.onrender.com/country=${selectCountry}/states`,
// 		);
// 		setStates(data);
// 	};

// 	const handleStateChange = (e) => {
// 		setSelectState(e.target.value);
// 	};

// 	useEffect(() => {
// 		if (selectCountry != '') {
// 			getState();
// 		}
// 	}, [selectCountry]);

// 	//--------( City )----------
// 	const getCity = async () => {
// 		let { data } = await axios.get(
// 			`https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`,
// 		);
// 		setCities(data);
// 	};

// 	const handleCityChange = (e) => {
// 		setSelectCities(e.target.value);
// 	};

// 	useEffect(() => {
// 		if (selectCountry != '' && selectState !== '') {
// 			getCity();
// 		}
// 	}, [selectCountry, selectState]);

// 	return (
// 		<div>
// 			<select onChange={handleCountryChange}>
// 				<option defaultValue selected disabled value=''>
// 					Select Country
// 				</option>
// 				{countries.map((country) => {
// 					return (
// 						<option key={country} value={country}>
// 							{country}
// 						</option>
// 					);
// 				})}
// 			</select>

// 			<select onChange={handleStateChange}>
// 				<option defaultValue selected disabled value=''>
// 					Select State
// 				</option>
// 				{states.map((state) => {
// 					return (
// 						<option key={state} value={state}>
// 							{state}
// 						</option>
// 					);
// 				})}
// 			</select>

// 			<select onChange={handleCityChange}>
// 				<option defaultValue selected disabled value=''>
// 					Select City
// 				</option>
// 				{cities.map((city) => {
// 					return (
// 						<option key={city} value={city}>
// 							{city}
// 						</option>
// 					);
// 				})}
// 			</select>
// 		</div>
// 	);
// };

// export default App;

import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [form, setForm] = useState({
		country: '',
		state: '',
		city: '',
	});

	useEffect(() => {
		fetchCountries();
	}, []);

	useEffect(() => {
		if (!!form.country) fetchStates();
		setCities([]);
	}, [form.country]);

	useEffect(() => {
		if (!!form.state) fetchCities();
		setForm((data) => ({ ...data, city: '' }));
	}, [form.state]);

	const fetchCountries = async () => {
		try {
			const country = await fetch(
				`https://crio-location-selector.onrender.com/countries`,
			);
			const respCountry = await country.json();
			setCountries(respCountry);
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchStates = async () => {
		try {
			const state = await fetch(
				`https://crio-location-selector.onrender.com/country=${form.country}/states`,
			);
			const respState = await state.json();
			setStates(respState);
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchCities = async () => {
		try {
			const city = await fetch(
				`https://crio-location-selector.onrender.com/country=${form.country}/state=${form.state}/cities`,
			);
			const respCity = await city.json();
			setCities(respCity);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className='App'>
			<h1>Select Location</h1>
			<div className='App-data'>
				<select
					value={form.country}
					onChange={(e) => {
						setForm((data) => ({
							...data,
							country: e.target.value,
						}));
					}}>
					<option value='' disabled>
						Select Country
					</option>
					{countries.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
				<select
					value={form.state}
					onChange={(e) =>
						setForm((data) => ({
							...data,
							state: e.target.value,
						}))
					}>
					<option value='' disabled>
						Select State
					</option>
					{states.map((state) => (
						<option key={state} value={state}>
							{state}
						</option>
					))}
				</select>
				<select
					value={form.city}
					onChange={(e) =>
						setForm((data) => ({
							...data,
							city: e.target.value,
						}))
					}>
					<option value='' disabled>
						Select City
					</option>
					{cities.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
			{!!form.city && (
				<p className='para'>
					You selected {form.city}, {form.state},{' '}
					{form.country}
				</p>
			)}
		</div>
	);
}

export default App;
