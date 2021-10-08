import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from 'fBase';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomEnterRoom, atomMyInfo, atomRoomsInfo } from 'Recoil/atom';
import { IRoomInfo } from 'Types';

import { style } from './ChatRoomStyle';
import { FaCaretRight, FaCaretDown, FaPlusSquare } from 'react-icons/fa';
import { getDate } from 'Utils/getDate';

const ChatRoom = () => {
  const history = useHistory();
  const [roomsList, setRoomsList] = useRecoilState(atomRoomsInfo);
  const [enterRoom, setEnterRoom] = useRecoilState(atomEnterRoom);
  const myInfo = useRecoilValue(atomMyInfo);
  const [toggle, setToggle] = useState<boolean>(true);
  const [add, setAdd] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const roomsListener = () => {
    const q = query(collection(db, 'Rooms'), orderBy('date'));
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

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleAdd = () => {
    setAdd(!add);
  };

  const handleRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEnter = async () => {
    const temp = title;
    setAdd(false);

    await setDoc(doc(db, 'Rooms', temp), {
      roomID: roomsList === [] ? roomsList[roomsList.length - 1].roomID + 1 : 0,
      roomName: temp,
      Owner: myInfo.uid,
      Members: [myInfo.uid],
      date: getDate(),
    });
    setTitle('');
  };

  const handleEnterRoom = (data: IRoomInfo) => {
    history.push({
      pathname: `/chat/${data.roomName}`,
      state: data.roomName,
    });

    setEnterRoom(data);
  };

  return (
    <RoomContainer>
      <RoomTitleWrap>
        <RoomTitle onClick={handleToggle}>
          {toggle ? <FaCaretDown /> : <FaCaretRight />}
          Room
        </RoomTitle>
        <Btn>
          <FaPlusSquare onClick={handleAdd} />
        </Btn>
      </RoomTitleWrap>
      {add && (
        <>
          <input
            value={title}
            onChange={handleRoomName}
            // onKeyPress={handleEnter}
          />
          <button onClick={handleEnter}>등록</button>
        </>
      )}
      {toggle ? (
        <RoomList>
          {roomsList.map((data) => (
            <Room key={data.roomID} onClick={() => handleEnterRoom(data)}>
              # {data.roomName}
            </Room>
          ))}
        </RoomList>
      ) : null}
    </RoomContainer>
  );
};

export default ChatRoom;

const { RoomContainer, RoomTitle, RoomList, RoomTitleWrap, Btn, Room } = style;
