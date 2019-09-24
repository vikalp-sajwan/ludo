import React from 'react';
import { connect } from 'react-redux';
import Game from './components/Game';
import { getPresentationalData } from './utils';

const mapStateToProps = state => {
  return { state: getPresentationalData(state) };
};

const App = ({ state }) => {
  return <Game gameState={state} />;
};

export default connect(mapStateToProps)(App);
