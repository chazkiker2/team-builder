import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import styled from "styled-components";

import Form from "./components/Form";
import Teammate from './components/Teammate';
import axios from './axios';


const AppContainer = styled.div`
	width: 98%;
	/* margin: 0 auto; */
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	.team-form-wrapper {
		width: 30%;
		display: inline-block;
		border: 1px solid black;
		margin: 2rem;
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
	const [memberToEdit, setMemberToEdit] = useState({});

	const stageMember = (member) => {
		setMemberToEdit(member);
	};

	const submitForm = (newMate) => {
		axios.post("fakeapi.com", newMate)
			.then(res => {
				setTeam([...team, res.data])
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
				<Form submit={submitForm} memberToEdit={memberToEdit} />
			</div>
			<div className="team-container">
				<h1>Team</h1>
				<div className="team-wrap">
					{
						team.map(mate => {
							return (<Teammate key={mate.id} details={mate} stageMember={stageMember} />);
						})
					}
				</div>
			</div>
		</AppContainer>
	);
}

export default App;
