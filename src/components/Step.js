import React from 'react';
import styled from 'styled-components';

import Piece from './Piece';
import { theme } from '../theme';
import starImg from '../images/star.svg';

export const StepTile = styled.div`
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

const MultiPieceStepTile = styled.div`
  width: 100px;
  height: 100px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
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

const getPieceCount = pieces => {
  return pieces.reduce((acc, piece) => acc + Number(piece.times), 0);
};

const generatePieces = pieces => {
  let pieceItems = [];
  pieces.forEach((piece, index) => {
    for (let count = 0; count < piece.times; count++) {
      pieceItems.push(<Piece color={piece.color} key={index + '' + count} />);
    }
  });
  return pieceItems;
};

const generateGroupedPieces = pieces => {
  return pieces.map(piece => (
    <Piece key={piece.color} color={piece.color} times={piece.times} />
  ));
};

const Step = props => {
  const { color = 'white', showStar = false, pieces = [] } = props;
  const pieceCount = getPieceCount(pieces);

  if (pieceCount < 2) {
    const pieceItems = generatePieces(pieces);
    return (
      <StepTile color={color} showStar={showStar}>
        {pieceItems}
      </StepTile>
    );
  } else if (pieceCount < 5) {
    const pieceItems = generatePieces(pieces);
    return (
      <MultiPieceStepTile color={color} showStar={showStar}>
        {pieceItems}
      </MultiPieceStepTile>
    );
  } else {
    const pieceItems = generateGroupedPieces(pieces);
    return (
      <MultiPieceStepTile color={color} showStar={showStar}>
        {pieceItems}
      </MultiPieceStepTile>
    );
  }
};

export default Step;
