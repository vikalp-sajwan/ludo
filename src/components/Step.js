import React from 'react';
import styled from 'styled-components';

import Piece from './Piece';
import { theme } from '../theme';
import starImg from '../images/star.svg';

const StepTile = styled.div`
  width: 100px;
  height: 100px;
  display: grid;
  align-items: center;
  justify-items: center;
  border: 5px solid rgba(0, 0, 0, 0.03);
  border-radius: 3px;
  box-sizing: border-box;
  background-color: ${props => theme.base[props.color]};

  ${({ showStar }) =>
    showStar &&
    `
    background: url(${starImg}) no-repeat;
  `}
`;

const Step = props => {
  const { color = 'white', showStar = false, pieces = [] } = props;
  const pieceItems = pieces.map(pieceColor => <Piece color={pieceColor} />);

  return (
    <StepTile color={color} showStar={showStar}>
      {pieceItems}
    </StepTile>
  );
};

export default Step;
