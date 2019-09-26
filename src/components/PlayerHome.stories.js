import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import PlayerHome from './PlayerHome';

const Wrapper = styled.div`
  height: 300px;
  width: 300px;
`;

storiesOf('PlayerHome', module)
  .add('empty', () => (
    <Wrapper>
      <PlayerHome color="yellow" />
    </Wrapper>
  ))
  .add('with pieces', () => (
    <Wrapper>
      <PlayerHome color="yellow" pieceCount="3" />
    </Wrapper>
  ))
  .add('highlighted and clickable', () => (
    <Wrapper>
      <PlayerHome color="red" pieceCount="3" isPlayingTurn={true} />
    </Wrapper>
  ));
