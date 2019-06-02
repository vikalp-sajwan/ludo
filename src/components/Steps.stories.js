import React from 'react';

import { storiesOf } from '@storybook/react';
import Step from './Step';

storiesOf('Step', module)
  .add('normal', () => <Step />)
  .add('colored', () => <Step color="red" />)
  .add('with piece', () => <Step pieces={['yellow']} />)
  .add('colored with piece', () => <Step color="blue" pieces={['yellow']} />)
  .add('star step', () => <Step showStar={true} />);
