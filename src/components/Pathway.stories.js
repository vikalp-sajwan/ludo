import React from 'react';
import { storiesOf } from '@storybook/react';

import Pathway from './Pathway';

const pieces = {
  9: [
    { color: 'red', times: 1, piecePosition: 43 },
    { color: 'blue', times: 2, piecePosition: 32 },
    { color: 'yellow', times: 1, piecePosition: 13 }
  ],
  4: [
    { color: 'blue', times: 1, piecePosition: 12 },
    { color: 'yellow', times: 1, piecePosition: 22 }
  ],
  12: [{ color: 'green', times: 1, piecePosition: 51 }]
};

storiesOf('Pathway', module)
  .add('left', () => <Pathway color="red" position="left" />)
  .add('top', () => <Pathway color="green" position="top" />)
  .add('right', () => <Pathway color="blue" position="right" />)
  .add('bottom', () => <Pathway color="yellow" position="bottom" />)
  .add('left with pieces', () => (
    <Pathway color="yellow" position="left" pieces={pieces} />
  ));
