import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from './axios';

import Form from "./components/Form";
import Teammate from './components/Teammate';

import './App.css';

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
`;

function App() {
	const [team, setTeam] = useState([]);
	const [memberToEdit, setMemberToEdit] = useState({});
	// const [isEditing, setIsEditing] = useState(false);

	// const toggle = () => { setIsEditing(!isEditing)};

	const stageMember = (member) => {
		if (member) {
			// toggle();
			setMemberToEdit(member);
		}
	};

	const editMember = (editMate) => {
		const newTeam = team.map(member => {
			if (member.id === editMate.id) {
				return ({...editMate});
			} else {
				return member;
			}
		});
		console.log(newTeam);
		
		setTeam([...newTeam]);
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
				<Form submit={submitForm} memberToEdit={memberToEdit} editMember = {editMember} />
			</div>
			<div className="team-container">
				<h1>Team</h1>
				<div className="team-wrap">
					{
						team.map(mate => {
							return (
								<Teammate 
									key={mate.id} 
									details={mate} 
									stageMember={stageMember} 
									
									// isEditing={isEditing}
									/>
							);
						})
					}
				</div>
			</div>
		</AppContainer>
	);
}

export default App;
