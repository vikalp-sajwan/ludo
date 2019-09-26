import React from 'react';
import { storiesOf } from '@storybook/react';

import VictoryCastle from './VictoryCastle';

const emptyPieceData = [
  { color: 'yellow', pieceCount: 0 },
  { color: 'blue', pieceCount: 0 },
  { color: 'green', pieceCount: 0 },
  { color: 'red', pieceCount: 0 }
];

const pieceData = [
  { color: 'red', pieceCount: 1 },
  { color: 'blue', pieceCount: 2 },
  { color: 'green', pieceCount: 4 },
  { color: 'yellow', pieceCount: 3 }
];

storiesOf('VictoryCastle', module)
  .add('default', () => <VictoryCastle pieceData={emptyPieceData} />)
  .add('withPieces', () => <VictoryCastle pieceData={pieceData} />);
