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
    diceValue: diceValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDiceThrow: () =>
      dispatch({ type: 'DICE_ROLL', value: Math.floor(Math.random() * 6) + 1 })
  };
};

const DiceSection = ({ enableDice, diceValue, handleDiceThrow }) => {
  const displayMessage = !diceValue ? 'Throw Dice!!!' : `It's a ${diceValue}`;

  return (
    <Wrapper>
      <Message>{displayMessage}</Message>
      <Button disabled={!enableDice} onClick={handleDiceThrow}>
        Throw
      </Button>
    </Wrapper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiceSection);
