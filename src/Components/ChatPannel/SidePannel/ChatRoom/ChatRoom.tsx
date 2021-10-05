import React, { useState } from 'react';
import { style } from './ChatRoomStyle';
import { FaCaretRight, FaCaretDown, FaPlusSquare } from 'react-icons/fa';
import user from 'Assets/MOCK_DATA';

const ChatRoom = () => {
  const renderRooms = user.map((data) => <li key={data.id}># {data.room}</li>);

  const [toggle, setToggle] = useState<boolean>(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleAdd = () => {};

  return (
    <RoomContainer>
      <RoomTitleWrap>
        <RoomTitle onClick={handleToggle}>
          {toggle ? <FaCaretDown /> : <FaCaretRight />}
          Room
        </RoomTitle>
        <Btn>
          <FaPlusSquare />
        </Btn>
      </RoomTitleWrap>
      {toggle ? <RoomList>{renderRooms}</RoomList> : null}
    </RoomContainer>
  );
};

export default ChatRoom;

const { RoomContainer, RoomTitle, RoomList, RoomTitleWrap, Btn } = style;
