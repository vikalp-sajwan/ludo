import React from 'react';
import { storiesOf } from '@storybook/react';

import DiceSection from './DiceSection';

storiesOf('DiceSection', module).add('default', () => (
  <DiceSection enableDice={true} />
));
