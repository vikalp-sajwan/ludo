import React from 'react';
import styled from 'styled-components';

import Piece from './Piece';
import { theme } from '../theme';

const StepTile = styled.div`
  width: 100px;
  height: 100px;
  display: grid;
  align-items: center;
  border: 5px solid rgba(0, 0, 0, 0.03);
  border-radius: 3px;
  background-color: ${props => theme.base[props.color]};
`;

const Step = props => {
  const { color = 'white', pieces = [] } = props;
  const pieceItems = pieces.map(pieceColor => <Piece color={pieceColor} />);

  return <StepTile color={color}>{pieceItems}</StepTile>;
};

export default Step;
