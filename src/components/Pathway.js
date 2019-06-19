import React from 'react';
import styled from 'styled-components';
import '../App.css';

import Step from './Step';

// prettier-ignore
const pathStructure = {
  left: [
    [8,  9, 10, 11, 12, 13],
    [7, 14, 15, 16, 17, 18],
    [6,  5,  4,  3,  2,  1]
  ],
  top: [
    [6,  7,  8],
    [5, 14,  9],
    [4, 15, 10],
    [3, 16, 11],
    [2, 17, 12],
    [1, 18, 13]
  ],
  right: [
    [ 1,  2,  3,  4,  5, 6],
    [18, 17, 16, 15, 14, 7],
    [13, 12, 11, 10,  9, 8]
  ],
  bottom: [
    [13, 18, 1],
    [12, 17, 2],
    [11, 16, 3],
    [10, 15, 4],
    [ 9, 14, 5],
    [ 8,  7, 6]
  ]
};

const colorPositions = [9, 14, 15, 16, 17, 18];
const starPosition = 4;

const generatePath = (position, color, pieces) => {
  const pathway = [];
  pathStructure[position].forEach(group => {
    group.forEach(stepPosition => {
      if (colorPositions.includes(stepPosition)) {
        pathway.push(
          <Step
            key={stepPosition}
            color={color}
            pieces={pieces[stepPosition]}
          />
        );
      } else if (stepPosition === starPosition) {
        pathway.push(
          <Step
            key={stepPosition}
            showStar={true}
            pieces={pieces[stepPosition]}
          />
        );
      } else {
        pathway.push(<Step key={stepPosition} pieces={pieces[stepPosition]} />);
      }
    });
  });

  return pathway;
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 3px;
  ${({ position }) =>
    (position === 'top' || position === 'bottom') &&
    `
    grid-template-columns: repeat(3, 1fr)
  `}
`;

const Pathway = props => {
  const { position, color, pieces = {} } = props;
  const pathway = generatePath(position, color, pieces);
  return <Wrapper position={position}>{pathway}</Wrapper>;
};

export default Pathway;
