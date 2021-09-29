import React from 'react';
import { style } from './MessageFormStyle';

const MessageForm = () => {
  return (
    <Container>
      <Inner>
        <InnerBox>
          <Input placeholder="입력해주세요"></Input>
        </InnerBox>
      </Inner>
    </Container>
  );
};

export default MessageForm;

const { Container, Inner, InnerBox, Input } = style;
