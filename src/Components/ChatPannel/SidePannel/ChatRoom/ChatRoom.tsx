import React, { useEffect, useState } from 'react';
import user from 'Assets/MOCK_DATA';

import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'fBase';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { atomRoomsInfo } from 'Recoil/atom';
import { IRoomInfo } from 'Types';

import { style } from './ChatRoomStyle';
import { FaCaretRight, FaCaretDown, FaPlusSquare } from 'react-icons/fa';

const ChatRoom = () => {
  const [roomsList, setRoomsList] = useRecoilState(atomRoomsInfo);
  const [toggle, setToggle] = useState<boolean>(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleAdd = () => {};

  const roomsListener = () => {
    const q = query(collection(db, 'Rooms'));
    onSnapshot(q, (query) => {
      const temp: IRoomInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        temp.push({
          roomID: docData.roomID,
          roomName: docData.roomName,
          Owner: docData.Owner,
          Members: docData.Members,
        });
      });
      setRoomsList(temp);
    });
  };

  useEffect(() => {
    roomsListener();
  }, []);

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
      {toggle ? (
        <RoomList>
          {roomsList.map((data) => (
            <li key={data.roomID}># {data.roomName}</li>
          ))}
        </RoomList>
      ) : null}
    </RoomContainer>
  );
};

export default ChatRoom;

const { RoomContainer, RoomTitle, RoomList, RoomTitleWrap, Btn } = style;
