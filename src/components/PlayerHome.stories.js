import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import PlayerHome from './PlayerHome';

const Wrapper = styled.div`
  height: 300px;
  width: 300px;
`;

storiesOf('PlayerHome', module).add('with pieces', () => (
  <Wrapper>
    <PlayerHome color="yellow" numOfPieces="3" />
  </Wrapper>
));
