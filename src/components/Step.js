import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Piece from './Piece';
import { theme } from '../theme';
import starImg from '../images/star.svg';

export const StepTile = styled.div`
  width: 50px;
  height: 50px;
  display: grid;
  align-items: center;
  justify-items: center;
  border: 5px solid rgba(0, 0, 0, 0.03);
  border-radius: 3px;
  box-sizing: border-box;
  background-color: ${props => theme.base[props.color]};
  ${({ highlight }) =>
    highlight &&
    `
      animation: glow-step 0.8s ease-out infinite;
      z-index: 5;
      cursor: pointer;
    `}

  @keyframes glow-step {
    0% {
      box-shadow: 0px 0px 0px 0px #055;
    }
    100% {
      box-shadow: 0px 0px 5px 5px #0ee;
    }
  }
  ${({ showStar }) => showStar && `background: url(${starImg}) no-repeat;`}
`;

const MultiPieceStepTile = styled.div`
  width: 50px;
  height: 50px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  border: 5px solid rgba(0, 0, 0, 0.03);
  border-radius: 3px;
  box-sizing: border-box;
  background-color: ${props => theme.base[props.color]};
  ${({ highlight }) =>
    highlight &&
    `
      animation: glow-step 0.8s ease-out infinite;
      z-index: 5;
      cursor: pointer;
    `}

  @keyframes glow-step {
    0% {
      box-shadow: 0px 0px 0px 0px #055;
    }
    100% {
      box-shadow: 0px 0px 5px 5px #0ee;
    }
  }
  ${({ showStar }) => showStar && `background: url(${starImg}) no-repeat;`}
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

const isClickableStep = pieces => {
  let isClickable = false;
  pieces.forEach(stepPieceData => {
    if (stepPieceData.isClickable) {
      isClickable = true;
    }
  });
  return isClickable;
};

const pieceMoveActionCreator = (stepPieces, dispatch) => {
  let clickablePiecePosition = null;
  let clickablePieceColor = null;
  stepPieces.map(pieceData => {
    if (pieceData.isClickable) {
      clickablePiecePosition = pieceData.piecePosition;
      clickablePieceColor = pieceData.color;
    }
  });
  return () => {
    dispatch({
      type: 'MOVE_PIECE',
      color: clickablePieceColor,
      currentStepValue: clickablePiecePosition
    });
  };
};

const mapStateToProps = ({ diceValue, currentPlayer }) => {
  return {
    diceValue,
    currentPlayer
  };
};

const Step = props => {
  const { color = 'white', showStar = false, pieces = [], dispatch } = props;
  const pieceCount = getPieceCount(pieces);
  const isClickable = isClickableStep(pieces);

  if (pieceCount < 2) {
    const pieceItems = generatePieces(pieces);
    return (
      <StepTile
        color={color}
        showStar={showStar}
        highlight={isClickable}
        onClick={isClickable ? pieceMoveActionCreator(pieces, dispatch) : null}
      >
        {pieceItems}
      </StepTile>
    );
  } else if (pieceCount < 5) {
    const pieceItems = generatePieces(pieces);
    return (
      <MultiPieceStepTile
        color={color}
        showStar={showStar}
        highlight={isClickable}
        onClick={isClickable ? pieceMoveActionCreator(pieces, dispatch) : null}
      >
        {pieceItems}
      </MultiPieceStepTile>
    );
  } else {
    const pieceItems = generateGroupedPieces(pieces);
    return (
      <MultiPieceStepTile
        color={color}
        showStar={showStar}
        highlight={isClickable}
        onClick={isClickable ? pieceMoveActionCreator(pieces, dispatch) : null}
      >
        {pieceItems}
      </MultiPieceStepTile>
    );
  }
};

export default connect(mapStateToProps)(Step);
