import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from "./components/Form";
import Teammate from "./components/Teammate";
import axios from 'axios';

const initFormVals = {
	username: "",
	email: "",
	role: "",
};

function App() {
	const [team, setTeam] = useState([]);
	const [formVals, setFormVals] = useState(initFormVals);

	const updateForm = (inputName, inputValue) => {
		setFormVals({ ...formVals, [inputName]: inputValue });
	};
	const submitForm = () => {
		const newMate = {};
		for (const [key, val] of Object.defineProperties({...formVals})) {
			if (val.trim() === "") {
				throw Error("unacceptable input");
			} else {
				newMate[key] = val.trim();
			}
		}
		axios.post(URL, newMate).then(res => {}).catch(err => { console.log(err)});
	};

	return (
		<div className="App">
			<h1>Team Form</h1>
			<Form values={formVals} update={updateForm} submit={submitForm} />
			{ team.map(mate => {
				return <Teammate key={mate.id} details={mate} />
			})

			}
		</div>
	);
}

export default App;
