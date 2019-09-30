import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { StepTile } from './Step';
import Piece from './Piece';
import { theme } from '../theme';

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  justify-items: center;
  border-radius: 5px;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  background: ${({ color }) => theme.base[color]};
  ${({ highlight }) =>
    highlight &&
    `box-shadow: 0px 0px 5px 5px #0ff; z-index: 5; cursor: pointer;`}
`;

const PlayerHomeTile = styled(StepTile)`
  border-radius: 50%;
  background-color: #fff;
  border: 3px solid #c2c2c2;
`;

const mapStateToProps = (
  { isPlayingTurn, currentPlayer },
  { color, pieceCount }
) => {
  return {
    highlight:
      currentPlayer === color &&
      (!isPlayingTurn || (isPlayingTurn && pieceCount > 0))
  };
};

const PlayerHome = ({ color, pieceCount = 0, highlight = false, dispatch }) => {
  let tiles = [
    <PlayerHomeTile key={0} />,
    <PlayerHomeTile key={1} />,
    <PlayerHomeTile key={2} />,
    <PlayerHomeTile key={3} />
  ];
  tiles = tiles.map((tile, index) => {
    return index <= pieceCount - 1 ? (
      <PlayerHomeTile key={index}>
        <Piece color={color} />
      </PlayerHomeTile>
    ) : (
      tile
    );
  });

  return (
    <Wrapper
      color={color}
      highlight={highlight}
      onClick={() =>
        dispatch({
          type: 'MOVE_PIECE',
          color: color,
          currentStepValue: 0
        })
      }
    >
      {tiles}
    </Wrapper>
  );
};

export default connect(mapStateToProps)(PlayerHome);
