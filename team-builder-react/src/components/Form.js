import React, { useState } from 'react';
// import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.form`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	/* align-items: center; */
	align-items: stretch;
	label {
		padding: 2%;
	}
	div.submit {
		padding: 2%;
	}
`;


const Form = (props) => {
	
	const {values, update, submit} = props;

	const onChange = evt => {
		const {name, value} = evt.target;
		update(name, value);
	};

	const onSubmit = evt => {
		evt.preventDefault();
		submit();
	};

	return (
		
		<FormContainer onSubmit={onSubmit}>
			{/* <div className="form-group inputs"> */}
				<label>
					Name
					<input 
						type="text" 
						name="name" 
						value={values.name} 
						onChange={onChange} 
						placeholder="John Snow" 
						/>
				</label>
				<label>
					Email
					<input 
						type="email" 
						name="email" 
						value={values.email} 
						onChange={onChange} 
						placeholder="john.snow@gmail.com" 
						/>
				</label>
				<label>
					Role
					<select
						value={values.role}
						name="role"
						onChange={onChange}
						>
						<option>--select role---</option>
						<option value="front-end">Front-End Marketing & Design</option>
						<option value="data-science">Data Science</option>
						<option value="react1">React I</option>
						<option value="react2">React II</option>
						<option value="api-dev">API Endpoints Developer</option>
						<option value="project-lead">Project Lead</option>
					</select>
				</label>
				<div className="submit">
					<button>SUBMIT</button>
				</div>
			{/* </div> */}
		</FormContainer>
	);
};

export default Form;