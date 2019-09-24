// offset of per color track wrt to global track
const GLOBAL_TRACK_OFFSET = {
  red: 0,
  blue: 13,
  green: 26,
  yellow: 39
};

export const getPresentationalData = gameState => {
  const presentationalData = {
    boardData: [],
    diceSectionData: {}
  };
  let boardData = getNonGlobalPathData(gameState);
  boardData = getGlobalPathData(boardData, gameState);
  presentationalData.boardData = boardData;
  presentationalData.diceSectionData = {
    enableDice: true
  };

  return presentationalData;
};

// prepare initial board component data with non global path pieces: home pieces, victory pieces and victory path data
const getNonGlobalPathData = gameState => {
  const boardData = [];

  gameState.players.forEach(playerColor => {
    let homePieceCount = 0;
    let victoryPieceCount = 0;
    let pathData = {};
    gameState.pieces[playerColor].forEach(piecePosition => {
      if (piecePosition == 0) {
        homePieceCount++;
      } else if (piecePosition == 57) {
        victoryPieceCount++;
      } else if (piecePosition > 51) {
        let pieceVictoryStepPosition = piecePosition - 38;
        addPieceToPathData(pathData, pieceVictoryStepPosition, playerColor);
      }
    });

    boardData.push({
      color: playerColor,
      homePieceCount: homePieceCount,
      victoryPieceCount: victoryPieceCount,
      pathData: pathData
    });
  });
  return boardData;
};

// calculate and get path data for pieces on global track
const getGlobalPathData = (boardData, gameState) => {
  gameState.players.forEach(playerColor => {
    gameState.pieces[playerColor].forEach(piecePosition => {
      // non global path pieces
      if (piecePosition < 1 || piecePosition > 51) {
        return;
      }
      let pieceGlobalPosition = getGlobalPosition(
        piecePosition,
        GLOBAL_TRACK_OFFSET[playerColor]
      );
      let piecePathColor = getPiecePathColor(pieceGlobalPosition);
      let piecePathPosition = getPiecePathPosition(
        piecePathColor,
        pieceGlobalPosition
      );

      addPieceToPathData(
        boardData[gameState.players.indexOf(piecePathColor)].pathData,
        piecePathPosition,
        playerColor
      );
    });
  });
  return boardData;
};

const getGlobalPosition = (position, offset) => {
  return (position + offset) % 52;
};

const getPiecePathColor = pieceGlobalPosition => {
  if (pieceGlobalPosition >= 45 || pieceGlobalPosition <= 5) {
    return 'red';
  } else if (pieceGlobalPosition >= 6 && pieceGlobalPosition <= 18) {
    return 'blue';
  } else if (pieceGlobalPosition >= 19 && pieceGlobalPosition <= 31) {
    return 'green';
  } else {
    return 'yellow';
  }
};

const getPiecePathPosition = (piecePathColor, pieceGlobalPosition) => {
  if (piecePathColor == 'red') {
    if (pieceGlobalPosition >= 1 && pieceGlobalPosition <= 5) {
      return pieceGlobalPosition + 8;
    }
    return pieceGlobalPosition - 5;
  } else if (piecePathColor == 'blue') {
    return pieceGlobalPosition - 5;
  } else if (piecePathColor == 'green') {
    return pieceGlobalPosition - 18;
  } else if (piecePathColor == 'yellow') {
    return pieceGlobalPosition - 31;
  }
};

const addPieceToPathData = (pathData, targetPosition, pieceColor) => {
  let isPieceAdded = false;
  for (let position in pathData) {
    if (position != targetPosition) {
      continue;
    }
    let newPathPositionData = pathData[position].map(({ color, times }) => {
      if (color == pieceColor) {
        isPieceAdded = true;
        return { color: color, times: times + 1 };
      } else {
        return { color: color, times: times };
      }
    });
    pathData[position] = newPathPositionData;
  }
  if (!isPieceAdded) {
    pathData[targetPosition] = pathData[targetPosition] || [];
    pathData[targetPosition].push({ color: pieceColor, times: 1 });
  }
};
