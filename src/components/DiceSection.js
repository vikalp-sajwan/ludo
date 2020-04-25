import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

const Message = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const Dice = styled.button`
  height: 100px;
  width: 100px;
  font-size: 36px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 700;
  color: white;
  border-radius: 5px;
  background: #8e8e8e;
  border: 5px solid rgba(0, 0, 0, 0.08);
  ${({ disabled }) =>
    !disabled &&
    `
    animation: glow-step 0.8s ease-out infinite;
      z-index: 5;
      cursor: pointer;
      font-size: 30px;
      background: #369936;
    `}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const mapStateToProps = ({ winner, isPlayingTurn, diceValue, currentPlayer }) => {
  return {
    enableDice: !winner && !isPlayingTurn,
    diceValue: diceValue,
    winner: winner,
    currentPlayer: currentPlayer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDiceThrow: (diceValue) =>
      dispatch({
        type: 'DICE_ROLL',
        diceValue: diceValue
      })
  };
};

const wait = (amount) => new Promise(resolve => setTimeout(resolve, amount));

const getRandomArray = () => {
  let lastRandom = 0;
  const generateRandomNumber = () => {
    const newRandom = Math.ceil(Math.random() * 6);
    if (newRandom !== lastRandom) {
      lastRandom = newRandom;
      return newRandom;
    }
    return generateRandomNumber();
  }
  return Array(8).fill(null).map(() => generateRandomNumber());
};

const diceThrowHandler = async (ref, after) => {
  const randomDiceValues = getRandomArray();
  for (let i = 0, duration = 50; i < randomDiceValues.length; i++ , duration += 20) {
    ref.current.innerHTML = randomDiceValues[i];
    await wait(duration);
  }
  await wait(250);
  after(randomDiceValues[randomDiceValues.length - 1]);
};

class DiceSection extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const { enableDice, diceValue, winner, currentPlayer } = this.props;
    let displayMessage = winner ? winner.toUpperCase() + ' WON !!!' : null;
    return (
      <Wrapper>
        {displayMessage && <Message>{displayMessage}</Message>}
        <Dice
        // this is needed because we are changing the DOM values with ref. But with next turn we want to re-render according to state.
        // And as the value to render was same as last render, compoenent was not re-rendering.
        // Therefore, used key attribute of react to ensure re-render with key change, and supplying a changed key each time using combination of props.
          key={enableDice + currentPlayer}
          ref={this.myRef} disabled={!enableDice}
          onClick={() => diceThrowHandler(this.myRef, this.props.handleDiceThrow)}
        >
          {(enableDice) ? 'ROLL' : diceValue}
        </Dice>
      </Wrapper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceSection);
