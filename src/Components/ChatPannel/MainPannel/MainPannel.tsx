import React from 'react';
import { MessageField, MessageForm, MessageHeader } from '.';
import styled from 'styled-components';

const MainPannel: React.FC = () => {
  return (
    <MessageContainer>
      <MessageHeader />
      <MessageField />
      <MessageForm />
    </MessageContainer>
  );
};

export default MainPannel;

const MessageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
