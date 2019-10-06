import { getGlobalPosition, isNonViolenceGlobalPosition } from '../utils';

const initialState = {
  players: ['red', 'blue', 'green', 'yellow'],
  winner: '',
  currentPlayer: 'red',
  isPlayingTurn: false,
  diceValue: null,
  pieces: {
    red: [0, 0, 0, 0],
    blue: [0, 0, 0, 0],
    green: [0, 0, 0, 0],
    yellow: [0, 0, 0, 0]
  }
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DICE_ROLL':
      const playableDiceValue = isPlayableDiceValue(
        state.pieces[state.currentPlayer],
        action.diceValue
      );
      return {
        ...state,
        isPlayingTurn: playableDiceValue,
        diceValue: action.diceValue,
        currentPlayer: playableDiceValue
          ? state.currentPlayer
          : getNextPlayer(state.players, state.currentPlayer)
      };

    case 'MOVE_PIECE':
      let newState = handleMovePiece(state, action);
      return checkWinner(newState);
    default:
      return state;
  }
};

const isPlayableDiceValue = (playerPieces, diceValue) => {
  let isPlayableTurn = false;
  if (diceValue === 6 && playerPieces.includes(0)) {
    isPlayableTurn = true;
  }
  playerPieces.forEach(stepValue => {
    if (stepValue > 0 && stepValue + diceValue <= 57) {
      isPlayableTurn = true;
    }
  });
  return isPlayableTurn;
};

const getNextPlayer = (players, currentPlayer) => {
  const nextPlayerIndex = players.indexOf(currentPlayer) + 1;
  return nextPlayerIndex === players.length
    ? players[0]
    : players[nextPlayerIndex];
};

const handleMovePiece = (state, { color, currentStepValue }) => {
  const { isPlayingTurn, pieces, diceValue, currentPlayer } = state;
  let turnPlayed = false;
  let enemyPiecePosition = null;
  let enemyPieceColor = null;
  if (currentPlayer === color && isPlayingTurn) {
    if (isPlayableDiceValue(pieces[currentPlayer], diceValue)) {
      const newPieceValues = pieces[color].map(stepValue => {
        if (turnPlayed) {
          return stepValue;
        }
        if (
          // piece in player home
          diceValue === 6 &&
          currentStepValue === 0 &&
          currentStepValue === stepValue
        ) {
          turnPlayed = true;
          return 1;
        } else if (currentStepValue >= 52 && currentStepValue === stepValue) {
          // piece in victory path
          turnPlayed = true;
          return stepValue + diceValue;
        } else if (currentStepValue > 0 && currentStepValue === stepValue) {
          // piece in global path
          turnPlayed = true;
          let targetGlobalPosition = getGlobalPosition(
            stepValue + diceValue,
            color
          );
          console.log('###############' + targetGlobalPosition);
          [enemyPieceColor, enemyPiecePosition] = getKillableEnemy(
            targetGlobalPosition,
            color,
            pieces
          );
          console.log(
            '############### killable enemy' +
              enemyPieceColor +
              enemyPiecePosition
          );

          return stepValue + diceValue;
        }
        return stepValue;
      });
      if (turnPlayed) {
        return {
          ...state,
          pieces: getNewPieceData(
            state,
            newPieceValues,
            enemyPieceColor,
            enemyPiecePosition
          ),
          isPlayingTurn: false,
          currentPlayer:
            diceValue === 6
              ? currentPlayer
              : getNextPlayer(state.players, state.currentPlayer, pieces),
          diceValue: null
        };
      }
    }
  }
  return state;
};

const getKillableEnemy = (targetGlobalPosition, currentPlayer, pieces) => {
  if (isNonViolenceGlobalPosition(targetGlobalPosition)) {
    return [null, null];
  }
  let killablePieceColor = null;
  let killablePiecePosition = null;
  Object.keys(pieces).map(color => {
    if (color !== currentPlayer) {
      pieces[color].map(piecePosition => {
        console.log(
          '$$$$$$$$' +
            targetGlobalPosition +
            '@@@@' +
            getGlobalPosition(piecePosition, color)
        );
        if (targetGlobalPosition === getGlobalPosition(piecePosition, color)) {
          killablePieceColor = color;
          killablePiecePosition = piecePosition;
        }
      });
    }
  });

  return [killablePieceColor, killablePiecePosition];
};

const getNewPieceData = (
  state,
  currentPlayerNewPieceData,
  killablePieceColor,
  killablePiecePosition
) => {
  console.table(killablePieceColor, killablePiecePosition);
  let newOtherColorData = {};
  if (killablePieceColor) {
    Object.keys(state.pieces).map(color => {
      if (color === killablePieceColor) {
        newOtherColorData[color] = state.pieces[color].map(piecePosition => {
          return piecePosition === killablePiecePosition ? 0 : piecePosition;
        });
      } else {
        newOtherColorData[color] = state.pieces[color];
      }
    });
    console.log(Object.keys(state.pieces));
    console.log({
      ...newOtherColorData,
      [state.currentPlayer]: currentPlayerNewPieceData
    });
    return {
      ...newOtherColorData,
      [state.currentPlayer]: currentPlayerNewPieceData
    };
  }
  return {
    ...state.pieces,
    [state.currentPlayer]: currentPlayerNewPieceData
  };
};

const checkWinner = state => {
  let winner = '';
  Object.keys(state.pieces).map(color => {
    let isVictorious = true;
    state.pieces[color].map(piecePosition => {
      if (piecePosition !== 57) {
        isVictorious = false;
      }
    });
    if (isVictorious) {
      winner = color;
    }
  });

  return {
    ...state,
    winner
  };
};
