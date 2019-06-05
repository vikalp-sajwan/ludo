import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import Piece from './Piece';

const Wrapper = styled.div`
  height: 100px;
  width: 100px;
  padding-top: 20px;
`;

storiesOf('Piece', module)
  .add('red', () => (
    <Wrapper>
      <Piece color="red" />
    </Wrapper>
  ))
  .add('blue', () => (
    <Wrapper>
      <Piece color="blue" />
    </Wrapper>
  ))
  .add('green', () => (
    <Wrapper>
      <Piece color="green" />
    </Wrapper>
  ))
  .add('yellow', () => (
    <Wrapper>
      <Piece color="yellow" />
    </Wrapper>
  ))
  .add('with piece count', () => (
    <Wrapper style={{ width: 50, height: 50 }}>
      <Piece color="green" times="3" />
    </Wrapper>
  ));
