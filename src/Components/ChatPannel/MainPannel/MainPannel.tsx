import React from 'react';
import { Message, MessageForm, MessageHeader } from '.';
import styled from 'styled-components';

const MainPannel = () => {
  return (
    <MessageContainer>
      <MessageHeader />
      <Message />
      <MessageForm />
    </MessageContainer>
  );
};

export default MainPannel;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
