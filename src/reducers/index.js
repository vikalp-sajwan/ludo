const initialState = {
  players: ['red', 'blue', 'green', 'yellow'],
  winner: '',
  currentTurn: 'red',
  pieces: {
    red: [0, 16, 0, 0],
    blue: [0, 0, 0, 0],
    green: [0, 0, 0, 0],
    yellow: [0, 0, 0, 0]
  }
};

export const rootReducer = (state = initialState, action) => state;
