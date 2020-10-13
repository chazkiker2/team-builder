import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const FormContainer = styled.form`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: stretch;
	label {
		padding: 2%;
	}
	div.submit {
		padding: 2%;
	}
`;

const initFormValues = {
	name: "",
	email: "",
	role: "",
};

const Form = (props) => {
	const [formValues, setFormValues] = useState(initFormValues);
	const {submit, memberToEdit} = props;

	useEffect( () => {
		const editValues = {};
		for (const [key, val] of Object.entries({...memberToEdit})) {
			if (key !== "id" && val) {
				editValues[key] = val;
			}
		}
		setFormValues(editValues);
	}, [memberToEdit]);

	const onChange = evt => {
		const {name, value} = evt.target;
		setFormValues({ ...formValues, [name]: value});
	};

	const onSubmit = evt => {
		evt.preventDefault();
		const newMate = {};
		for (const [key, val] of Object.entries({...formValues})) {
			if (val.trim() === "") {
				debugger;
				return;
			} else {
				newMate[key] = val.trim();
			}
		}
		submit(newMate);
		setFormValues(initFormValues);
		return newMate;
	};

	return (
		
		<FormContainer onSubmit={onSubmit}>
				<label>
					Name
					<input 
						type="text" 
						name="name" 
						value={formValues.name} 
						onChange={onChange} 
						placeholder="John Snow" 
						/>
				</label>
				<label>
					Email
					<input 
						type="email" 
						name="email" 
						value={formValues.email} 
						onChange={onChange} 
						placeholder="john.snow@gmail.com" 
						/>
				</label>
				<label>
					Role
					<select
						value={formValues.role}
						name="role"
						onChange={onChange}
						>
						<option>--select role---</option>
						<option value="Frontend--Marketing + Design">Front-End Marketing & Design</option>
						<option value="Data-Science">Data Science</option>
						<option value="React I">React I</option>
						<option value="React II">React II</option>
						<option value="API Endpoints Dev">API Endpoints Developer</option>
						<option value="Project Lead">Project Lead</option>
					</select>
				</label>
				<div className="submit">
					<button>SUBMIT</button>
				</div>
		</FormContainer>
	);
};

export default Form;