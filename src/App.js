import React from 'react';
import { connect } from 'react-redux';
import Game from './components/Game';

const mapStateToProps = state => {
  return { state: state };
};

const App = ({ state }) => {
  return <Game gameState={state} />;
};

export default connect(mapStateToProps)(App);
