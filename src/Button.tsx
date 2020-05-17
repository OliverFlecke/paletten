import styled from 'styled-components';
export const Button = styled.button<{
	color?: string;
}> `
	background-color: ${(props) => props.color ?? 'blue'};
	color: white;
	padding: 10px;
	margin: 6px;
	font-size: 1.2em;
	border-radius: 6px;
`;
