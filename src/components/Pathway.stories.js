import React from 'react';
import { storiesOf } from '@storybook/react';

import Pathway from './Pathway';

const pieces = {
  9: [
    { color: 'red', times: 1 },
    { color: 'blue', times: 2 },
    { color: 'yellow', times: 1 }
  ],
  4: [{ color: 'blue', times: 1 }, { color: 'yellow', times: 1 }],
  12: [{ color: 'green', times: 1 }]
};

storiesOf('Pathway', module)
  .add('left', () => <Pathway color="red" position="left" />)
  .add('top', () => <Pathway color="green" position="top" />)
  .add('right', () => <Pathway color="blue" position="right" />)
  .add('bottom', () => <Pathway color="yellow" position="bottom" />)
  .add('left with pieces', () => (
    <Pathway color="yellow" position="left" pieces={pieces} />
  ));
