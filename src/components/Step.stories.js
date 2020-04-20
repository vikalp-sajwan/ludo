import React from 'react';

import { storiesOf } from '@storybook/react';
import Step from './Step';

const pieces = [
  { color: 'red', times: 1 },
  { color: 'blue', times: 2 },
  { color: 'green', times: 3 },
  { color: 'yellow', times: 4 }
];

const clickablePiece = [
  { color: 'red', times: 1, isClickable: true },
];

storiesOf('Step', module)
  .add('default', () => <Step />)
  .add('colored', () => <Step color="red" />)
  .add('with single piece', () => <Step pieces={[pieces[0]]} />)
  .add('upto 4 pieces', () => <Step pieces={pieces.slice(0, 2)} />)
  .add('over 4 pieces', () => <Step pieces={pieces} />)
  .add('colored with piece', () => <Step color="blue" pieces={[pieces[0]]} />)
  .add('colored with multiple pieces', () => (
    <Step color="yellow" pieces={pieces.slice(0, 2)} />
  ))
  .add('star step', () => <Step showStar={true} />)
  .add('star step with piece', () => (
    <Step showStar={true} pieces={[pieces[0]]} />
  ))
  .add('star step with multiple pieces', () => (
    <Step showStar={true} pieces={pieces.slice(0, 2)} />
  ))
  .add('highlighted and clickable', () => (
    <Step pieces={ clickablePiece } />
  ));
