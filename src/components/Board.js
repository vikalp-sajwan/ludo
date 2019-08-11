import React from 'react';
import styled from 'styled-components';

import PlayerHome from './PlayerHome';
import Pathway from './Pathway';
import VictoryCastle from './VictoryCastle';

const BoardWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(15, 50px);
  grid-template-columns: repeat(15, 50px);
  grid-gap: 3px;
`;

const Home1Wrapper = styled.div`
  grid-column: 1 / span 6;
  grid-row: span 6 / -1;
`;

const Home2Wrapper = styled.div`
  grid-column: 1 / span 6;
  grid-row: 1 / span 6;
`;

const Home3Wrapper = styled.div`
  grid-column: span 6 / -1;
  grid-row: 1 / span 6;
`;

const Home4Wrapper = styled.div`
  grid-column: span 6 / -1;
  grid-row: span 6 / -1;
`;

const Path1Wrapper = styled.div`
  grid-column: 7 / span 3;
  grid-row: span 6 / -1;
`;

const Path2Wrapper = styled.div`
  grid-column: 1 / span 6;
  grid-row: 7 / span 3;
`;

const Path3Wrapper = styled.div`
  grid-column: 7 / span 3;
  grid-row: 1 / span 6;
`;

const Path4Wrapper = styled.div`
  grid-column: span 6 / -1;
  grid-row: 7 / span 3;
`;

const VictoryCastleWrapper = styled.div`
  grid-column: 7 / span 3;
  grid-row: 7 / span 3;
`;

const Board = ({ gameState = [] }) => {
  return (
    <BoardWrapper>
      <Path1Wrapper>
        <Pathway
          position="bottom"
          color={gameState[0].color}
          pieces={gameState[0].pathData}
        />
      </Path1Wrapper>
      <Path2Wrapper>
        <Pathway
          position="left"
          color={gameState[1].color}
          pieces={gameState[1].pathData}
        />
      </Path2Wrapper>
      <Path3Wrapper>
        <Pathway
          position="top"
          color={gameState[2].color}
          pieces={gameState[2].pathData}
        />
      </Path3Wrapper>
      <Path4Wrapper>
        <Pathway
          position="right"
          color={gameState[3].color}
          pieces={gameState[3].pathData}
        />
      </Path4Wrapper>

      <Home1Wrapper>
        <PlayerHome
          color={gameState[0].color}
          pieceCount={gameState[0].homePieceCount}
        />
      </Home1Wrapper>
      <Home2Wrapper>
        <PlayerHome
          color={gameState[1].color}
          pieceCount={gameState[1].homePieceCount}
        />
      </Home2Wrapper>
      <Home3Wrapper>
        <PlayerHome
          color={gameState[2].color}
          pieceCount={gameState[2].homePieceCount}
        />
      </Home3Wrapper>
      <Home4Wrapper>
        <PlayerHome
          color={gameState[3].color}
          pieceCount={gameState[3].homePieceCount}
        />
      </Home4Wrapper>

      <VictoryCastleWrapper>
        <VictoryCastle
          pieceData={[
            {
              color: gameState[0].color,
              pieceCount: gameState[0].victoryPieceCount
            },
            {
              color: gameState[1].color,
              pieceCount: gameState[1].victoryPieceCount
            },
            {
              color: gameState[2].color,
              pieceCount: gameState[2].victoryPieceCount
            },
            {
              color: gameState[3].color,
              pieceCount: gameState[3].victoryPieceCount
            }
          ]}
        />
      </VictoryCastleWrapper>
    </BoardWrapper>
  );
};

export default Board;
