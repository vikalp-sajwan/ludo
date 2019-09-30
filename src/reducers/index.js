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
      return handleMovePiece(state, action);
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
  if (currentPlayer === color && isPlayingTurn) {
    if (isPlayableDiceValue(pieces[currentPlayer], diceValue)) {
      const newPieceValues = pieces[color].map(stepValue => {
        if (turnPlayed) {
          return stepValue;
        }
        if (
          diceValue === 6 &&
          currentStepValue === 0 &&
          currentStepValue === stepValue
        ) {
          turnPlayed = true;
          return 1;
        } else if (currentStepValue > 0 && currentStepValue === stepValue) {
          turnPlayed = true;
          return stepValue + diceValue;
        }
        return stepValue;
      });
      if (turnPlayed) {
        return {
          ...state,
          pieces: {
            ...state.pieces,
            [currentPlayer]: newPieceValues
          },
          isPlayingTurn: false,
          currentPlayer:
            diceValue === 6
              ? currentPlayer
              : getNextPlayer(state.players, state.currentPlayer),
          diceValue: null
        };
      }
    }
  }
  return state;
};

// six gets another turn if it's playable

//
