import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";

import Form from "./components/Form";
import Teammate from './components/Teammate';
import axios from './axios';

const initFormValues = {
	name: "",
	email: "",
	role: "",
};

const AppContainer = styled.div`
	width: 98%;
	margin: 0 auto;
	.team-form-wrapper {
		width: 30%;
		display: inline-block;
		h1 {
			font-size: 2rem;
			font-weight: bold;
			background-color: lightblue;
		}
	}
	.team-container {
		width: 70%;
		display: inline-block;
		h1 {
			font-size: 2rem;
			font-weight: bold;
			background-color: lightblue;
		}
		.team-wrap {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: stretch;
		}
	}
	/* display: flex; */
	/* flex-flow: row nowrap; */
	/* border: 1px solid gray; */
`;

function App() {
	const [team, setTeam] = useState([]);
	const [formValues, setFormValues] = useState(initFormValues);

	const updateForm = (inputName, inputValue) => {
		setFormValues({ ...formValues, [inputName]: inputValue });
	};
	const submitForm = () => {
		const newMate = {};
		for (const [key, val] of Object.entries({ ...formValues })) {
			if (val.trim() === "") {
				console.log(val);
				debugger;
				throw Error("unacceptable input");
			} else {
				newMate[key] = val.trim();
			}
		}
		axios.post("fakeapi.com", newMate)
			.then(res => {
				setTeam([...team, res.data])
				setFormValues(initFormValues);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios.get('fakeapi.com').then(res => setTeam(res.data))
	}, [])

	return (
		<AppContainer className="App">
			<div className="team-form-wrapper">
				<h1>Team Form</h1>
				<Form values={formValues} update={updateForm} submit={submitForm} />
			</div>
			<div className="team-container">
				<h1>Team</h1>
				<div className="team-wrap">
					{
						team.map(mate => {
							return (<Teammate key={mate.id} details={mate} />);
						})
					}
				</div>
			</div>
		</AppContainer>
	);
}

export default App;
