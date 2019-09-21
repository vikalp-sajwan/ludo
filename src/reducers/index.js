const initialState = [
  {
    color: 'red',
    homePieceCount: 4,
    victoryPieceCount: 0,
    pathData: {}
  },
  {
    color: 'blue',
    homePieceCount: 4,
    victoryPieceCount: 0,
    pathData: {}
  },
  {
    color: 'green',
    homePieceCount: 4,
    victoryPieceCount: 0,
    pathData: {}
  },
  {
    color: 'yellow',
    homePieceCount: 4,
    victoryPieceCount: 0,
    pathData: {}
  }
];

export const rootReducer = (state = initialState, action) => state;
