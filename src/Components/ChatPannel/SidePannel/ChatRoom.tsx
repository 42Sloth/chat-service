import React from 'react';
import { style } from './ChatRoomStyle';
import { FaCaretRight } from 'react-icons/fa';
import user from 'Assets/MOCK_DATA';

const ChatRoom = () => {
  const renderRooms = user.map((data) => <li key={data.id}># {data.room}</li>);

  return (
    <RoomContainer>
      <RoomTitle>
        <FaCaretRight />
        Room
      </RoomTitle>
      <RoomList>{renderRooms}</RoomList>
    </RoomContainer>
  );
};

export default ChatRoom;

const { RoomContainer, RoomTitle, RoomList } = style;
