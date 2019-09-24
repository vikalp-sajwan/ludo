import React from 'react';
import styled from 'styled-components';

import Board from './Board';
import DiceSection from './DiceSection';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: auto minmax(250px, auto);
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const Game = ({ gameState }) => {
  return (
    <Wrapper>
      <Board boardData={gameState.boardData} />
      <DiceSection {...gameState.diceSectionData} />
    </Wrapper>
  );
};

export default Game;
