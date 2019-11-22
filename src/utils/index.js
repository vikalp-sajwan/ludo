// offset of per color track wrt to global track
const GLOBAL_TRACK_OFFSET = {
  red: 51,
  blue: 12,
  green: 25,
  yellow: 38
};

const NON_VIOLENCE_GLOBAL_POSITIONS = [1, 9, 14, 22, 27, 35, 40, 48];

export const getPresentationalData = gameState => {
  const presentationalData = {
    boardData: []
  };
  let boardData = getNonGlobalPathData(gameState);
  boardData = getGlobalPathData(boardData, gameState);
  presentationalData.boardData = boardData;

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
      if (piecePosition === 0) {
        homePieceCount++;
      } else if (piecePosition === 57) {
        victoryPieceCount++;
      } else if (piecePosition > 51) {
        let pieceVictoryStepPosition = piecePosition - 38;
        addPieceToPathData(
          pathData,
          pieceVictoryStepPosition,
          piecePosition,
          playerColor,
          playerColor !== gameState.currentPlayer || !gameState.isPlayingTurn
            ? false
            : isPlayablePiece(piecePosition, gameState.diceValue)
        );
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

const isPlayablePiece = (piecePosition, diceValue) => {
  if (diceValue === 6 && piecePosition === 0) {
    return true;
  }
  if (piecePosition > 0 && piecePosition + diceValue <= 57) {
    return true;
  }
  return false;
};

// calculate and get path data for pieces on global track
const getGlobalPathData = (boardData, gameState) => {
  gameState.players.forEach(playerColor => {
    gameState.pieces[playerColor].forEach(piecePosition => {
      // non global path pieces
      if (piecePosition < 1 || piecePosition > 51) {
        return;
      }
      let pieceGlobalPosition = getGlobalPosition(piecePosition, playerColor);
      let piecePathColor = getPiecePathColor(pieceGlobalPosition);
      let piecePathPosition = getPiecePathPosition(
        piecePathColor,
        pieceGlobalPosition
      );

      addPieceToPathData(
        boardData[gameState.players.indexOf(piecePathColor)].pathData,
        piecePathPosition,
        piecePosition,
        playerColor,
        playerColor !== gameState.currentPlayer || !gameState.isPlayingTurn
          ? false
          : isPlayablePiece(piecePosition, gameState.diceValue)
      );
    });
  });
  return boardData;
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
  // console.log(pieceGlobalPosition, piecePathColor);
  if (piecePathColor === 'red') {
    if (pieceGlobalPosition >= 1 && pieceGlobalPosition <= 5) {
      return pieceGlobalPosition + 8;
    }
    return pieceGlobalPosition - 44;
  } else if (piecePathColor === 'blue') {
    return pieceGlobalPosition - 5;
  } else if (piecePathColor === 'green') {
    return pieceGlobalPosition - 18;
  } else if (piecePathColor === 'yellow') {
    return pieceGlobalPosition - 31;
  }
};

const addPieceToPathData = (
  pathData,
  targetPosition,
  piecePosition,
  pieceColor,
  isClickable
) => {
  let isPieceAdded = false;
  for (let position in pathData) {
    if (position !== targetPosition) {
      continue;
    }
    let newPathPositionData = pathData[position].map(
      ({ color, times, piecePosition, isClickable }) => {
        if (color === pieceColor) {
          isPieceAdded = true;
          return {
            color: color,
            piecePosition: piecePosition,
            times: times + 1,
            isClickable: isClickable
          };
        } else {
          return {
            color: color,
            piecePosition: piecePosition,
            times: times,
            isClickable: isClickable
          };
        }
      }
    );
    pathData[position] = newPathPositionData;
  }
  if (!isPieceAdded) {
    pathData[targetPosition] = pathData[targetPosition] || [];
    pathData[targetPosition].push({
      color: pieceColor,
      piecePosition: piecePosition,
      times: 1,
      isClickable: isClickable
    });
  }
};

export const getGlobalPosition = (position, playerColor) => {
  if (position >= 1 && position <= 51) {
    return ((position + GLOBAL_TRACK_OFFSET[playerColor]) % 52) + 1;
  }
  return null;
};

export const isNonViolenceGlobalPosition = position => {
  return NON_VIOLENCE_GLOBAL_POSITIONS.indexOf(position) >= 0;
};
