import React from 'react';
import styled from 'styled-components';

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

const PlayerHome = ({ color, pieceCount = 0, isclickable = false }) => {
  const tiles = [
    <PlayerHomeTile />,
    <PlayerHomeTile />,
    <PlayerHomeTile />,
    <PlayerHomeTile />
  ];
  tiles.fill(
    <PlayerHomeTile>
      <Piece color={color} />
    </PlayerHomeTile>,
    0,
    pieceCount
  );

  return (
    <Wrapper color={color} highlight={isclickable}>
      {tiles}
    </Wrapper>
  );
};

export default PlayerHome;
