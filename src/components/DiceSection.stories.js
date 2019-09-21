import React from 'react';
import { storiesOf } from '@storybook/react';

import DiceSection from './DiceSection';

storiesOf('DiceSection', module).add('basic', () => (
  <DiceSection enableDice={true} handleDiceThrow={num => console.log(num)} />
));
