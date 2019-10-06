import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

const Message = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const Button = styled.button`
  height: 40px;
  width: 80px;
  font-size: 18px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const mapStateToProps = ({ winner, isPlayingTurn, diceValue }) => {
  return {
    enableDice: !winner && !isPlayingTurn,
    diceValue: diceValue,
    winner: winner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDiceThrow: () =>
      dispatch({
        type: 'DICE_ROLL',
        diceValue: Math.floor(Math.random() * 6) + 1
      }),
    handleFakeDiceThrow: val =>
      dispatch({
        type: 'DICE_ROLL',
        diceValue: val
      })
  };
};

const DiceSection = ({
  enableDice,
  diceValue,
  winner,
  handleDiceThrow,
  handleFakeDiceThrow
}) => {
  let displayMessage = !diceValue ? 'Throw Dice!!!' : `It's a ${diceValue}`;
  displayMessage = winner ? winner.toUpperCase() + ' WON !!!' : displayMessage;

  return (
    <Wrapper>
      <Message>{displayMessage}</Message>
      <Button disabled={!enableDice} onClick={handleDiceThrow}>
        Throw
      </Button>
      <Button disabled={!enableDice} onClick={() => handleFakeDiceThrow(1)}>
        ---1---
      </Button>
      <Button disabled={!enableDice} onClick={() => handleFakeDiceThrow(2)}>
        ---2---
      </Button>
      <Button disabled={!enableDice} onClick={() => handleFakeDiceThrow(3)}>
        ---3---
      </Button>
      <Button disabled={!enableDice} onClick={() => handleFakeDiceThrow(4)}>
        ---4---
      </Button>
      <Button disabled={!enableDice} onClick={() => handleFakeDiceThrow(5)}>
        ---5---
      </Button>
      <Button disabled={!enableDice} onClick={() => handleFakeDiceThrow(6)}>
        ---6---
      </Button>
    </Wrapper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceSection);
