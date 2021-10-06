import React from 'react';
import { style } from './MessageHeaderStyle';

const MessageHeader: React.FC = () => {
  const joinRoomList = ['notice', 'articles', 'six-sense'];
  return (
    <Container>
      <JoinRoomList>
        {joinRoomList.map((item, idx) => {
          return <JoinRoom key={idx}># {item}</JoinRoom>;
        })}
      </JoinRoomList>
    </Container>
  );
};

export default MessageHeader;

const { Container, JoinRoomList, JoinRoom } = style;
