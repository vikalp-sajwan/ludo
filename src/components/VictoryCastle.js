import React from 'react';
import styled from 'styled-components';

import Piece from './Piece';
import { theme } from '../theme';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PieceWrapper = styled.div`
  width: 25%;
  height: 25%;
  position: absolute;
`;

const BottomPieceWrapper = styled(PieceWrapper)`
  bottom: 0;
  left: calc(24% + ${({ piecePosition }) => piecePosition * 6 + '%'});
`;

const LeftPieceWrapper = styled(PieceWrapper)`
  left: 2%;
  top: calc(24% + ${({ piecePosition }) => piecePosition * 6 + '%'});
`;

const TopPieceWrapper = styled(PieceWrapper)`
  top: 8%;
  left: calc(24% + ${({ piecePosition }) => piecePosition * 6 + '%'});
`;

const RightPieceWrapper = styled(PieceWrapper)`
  right: 2%;
  top: calc(24% + ${({ piecePosition }) => piecePosition * 6 + '%'});
`;

const getPieces = (colorBlockIndex, color, pieceCount) => {
  const pieceItems = [];
  for (let count = 0; count < pieceCount; count++) {
    if (colorBlockIndex === 0) {
      pieceItems.push(
        <BottomPieceWrapper piecePosition={count + 1}>
          <Piece color={color} key={colorBlockIndex + '' + count} />
        </BottomPieceWrapper>
      );
    } else if (colorBlockIndex === 1) {
      pieceItems.push(
        <LeftPieceWrapper piecePosition={count + 1}>
          <Piece color={color} key={colorBlockIndex + '' + count} />
        </LeftPieceWrapper>
      );
    } else if (colorBlockIndex === 2) {
      pieceItems.push(
        <TopPieceWrapper piecePosition={count + 1}>
          <Piece color={color} key={colorBlockIndex + '' + count} />
        </TopPieceWrapper>
      );
    } else {
      pieceItems.push(
        <RightPieceWrapper piecePosition={count + 1}>
          <Piece color={color} key={colorBlockIndex + '' + count} />
        </RightPieceWrapper>
      );
    }
  }
  return pieceItems;
};

const VictoryCastle = ({ pieceData }) => {
  const pieceItems = pieceData.map((data, index) =>
    getPieces(index, data.color, data.pieceCount)
  );
  return (
    <Wrapper>
      <svg height="100%" viewBox="0 0 512 512" width="100%">
        <path fill="#fff" d="M-1-1h514v514H-1z" />
        <g>
          <path
            fill={theme.base[pieceData[0]['color']]}
            d="M0 512l256-256L512 512H1z"
          />
          <path
            fill={theme.base[pieceData[1]['color']]}
            d="M0-512L256 256-0 512l0-512z"
          />
          <path
            fill={theme.base[pieceData[2]['color']]}
            d="M512 0L256 256 0 0h512z"
          />
          <path
            fill={theme.base[pieceData[3]['color']]}
            d="M512 512L256 256 512 0v512z"
          />
        </g>
      </svg>
      {pieceItems}
    </Wrapper>
  );
};

export default VictoryCastle;
