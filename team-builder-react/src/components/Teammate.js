import React from "react";
import styled from "styled-components";

const StyledMate = styled.div`
	border: 1px solid black;
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: stretch;
	h2 {
		font-weight: bold;
		
	}
`;

const Teammate = (props) => {
	const { details } = props;

	if (!details) {
		return <h3>Working on fetching your team-member&apos;s details...</h3>
	}

	return (
		<StyledMate className="teammate container">
			<h2>Name: {details.name}</h2>
			<p>Email: {details.email}</p>
			<p>Role: {details.role}</p>
		</StyledMate>
	);

};

export default Teammate;