import React, { useState } from 'react';
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

const DiceSection = ({ enableDice }) => {
  const [displayMessage, setDisplayMessage] = useState('Throw Dice!!!');

  const diceThrowHandler = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setDisplayMessage(`It's a ${diceValue}`);
  };

  return (
    <Wrapper>
      <Message>{displayMessage}</Message>
      <Button disabled={!enableDice} onClick={diceThrowHandler}>
        Throw
      </Button>
    </Wrapper>
  );
};

export default DiceSection;
