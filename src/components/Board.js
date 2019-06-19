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

const Board = () => {
  return (
    <BoardWrapper>
      <Path1Wrapper>
        <Pathway color="red" position="bottom" />
      </Path1Wrapper>
      <Path2Wrapper>
        <Pathway color="blue" position="left" />
      </Path2Wrapper>
      <Path3Wrapper>
        <Pathway color="green" position="top" />
      </Path3Wrapper>
      <Path4Wrapper>
        <Pathway color="yellow" position="right" />
      </Path4Wrapper>

      <Home1Wrapper>
        <PlayerHome color="red" />
      </Home1Wrapper>
      <Home2Wrapper>
        <PlayerHome color="blue" />
      </Home2Wrapper>
      <Home3Wrapper>
        <PlayerHome color="green" />
      </Home3Wrapper>
      <Home4Wrapper>
        <PlayerHome color="yellow" />
      </Home4Wrapper>

      <VictoryCastleWrapper>
        <VictoryCastle
          pieceData={[
            { color: 'red' },
            { color: 'blue' },
            { color: 'green' },
            { color: 'yellow' }
          ]}
        />
      </VictoryCastleWrapper>
    </BoardWrapper>
  );
};

export default Board;
