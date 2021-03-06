import React from 'react';
import { storiesOf } from '@storybook/react';

import Game from './Game';

const boardData = [
  {
    color: 'red',
    homePieceCount: 1,
    victoryPieceCount: 1,
    pathData: {}
  },
  {
    color: 'blue',
    homePieceCount: 0,
    victoryPieceCount: 2,
    pathData: {
      4: [{ color: 'red', times: 1 }, { color: 'yellow', times: 1 }]
    }
  },
  {
    color: 'green',
    homePieceCount: 4,
    victoryPieceCount: 0,
    pathData: {
      4: [{ color: 'blue', times: 1 }, { color: 'yellow', times: 1 }]
    }
  },
  {
    color: 'yellow',
    homePieceCount: 3,
    victoryPieceCount: 0,
    pathData: {
      9: [{ color: 'blue', times: 1 }],
      12: [{ color: 'red', times: 1 }]
    }
  }
];

storiesOf('Game', module).add('default', () => (
  <Game gameState={{ boardData }} />
));
