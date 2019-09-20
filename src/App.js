import React from 'react';
import { connect } from 'react-redux';
import Board from './components/Board';

const mapStateToProps = state => {
  return { state: state };
};

const App = ({ state }) => {
  return <Board gameState={state} />;
};

export default connect(mapStateToProps)(App);
