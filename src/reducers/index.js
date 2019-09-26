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
      return {
        ...state,
        isPlayingTurn: true,
        diceValue: action.value
      };
    default:
      return state;
  }
};
