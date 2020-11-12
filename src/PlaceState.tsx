import React from 'react';
import { IPlace } from './models';
import styled from 'styled-components';

interface PlaceStateProps {
	state: IPlace;
	name: string;
}

export const PlaceState = ({ state, name }: PlaceStateProps) => {
	return (
		<Container>
			<Name>{name}</Name>

			<Wrapper>
				Temperatur: <span>{state.temperature} &#176;C</span>
			</Wrapper>
			<Wrapper>
				Fugtighed:
				<span>{state.humidity} %</span>
			</Wrapper>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	max-width: 200px;
	box-sizing: border-box;
	padding: 0 10px;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Name = styled.h3`
	padding: 0;
	margin: 0;
	margin-bottom: 6px;
`;
