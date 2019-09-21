import React from 'react';
import styled from 'styled-components';

import Board from './Board';
import DiceSection from './DiceSection';

const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 4fr 1fr;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const Game = ({ gameState }) => {
  return (
    <Wrapper>
      <Board boardData={gameState} />
      <DiceSection enableDice={true} handleDiceThrow={a => console.log(a)} />
    </Wrapper>
  );
};

export default Game;
