import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'fBase';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  atomEnterRoom,
  atomMyInfo,
  atomRoomsInfo,
  atomRoomCheck,
} from 'Recoil/atom';
import { IRoomInfo } from 'Types';

import { style } from './ChatRoomStyle';
import { getDate } from 'Utils/getDate';
import {
  FaCaretRight,
  FaCaretDown,
  FaPlusSquare,
  FaHashtag,
} from 'react-icons/fa';

const ChatRoom = () => {
  const history = useHistory();
  const [roomsList, setRoomsList] = useRecoilState(atomRoomsInfo);
  const setEnterRoom = useSetRecoilState(atomEnterRoom);
  const myInfo = useRecoilValue(atomMyInfo);
  const [toggle, setToggle] = useState<boolean>(true);
  const [add, setAdd] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const setIsDirect = useSetRecoilState(atomRoomCheck);

  // const roomsListener = () => {
  //   const q = query(collection(db, 'Rooms'), orderBy('date'));
  //   onSnapshot(q, (query) => {
  //     const temp: IRoomInfo[] = [];
  //     query.forEach((doc) => {
  //       const docData = doc.data();
  //       temp.push({
  //         roomID: docData.roomID,
  //         roomName: docData.roomName,
  //         Owner: docData.Owner,
  //         Members: docData.Members,
  //         date: docData.date,
  //       });
  //     });
  //     setRoomsList(temp);
  //   });
  // };

  // useEffect(() => {
  //   roomsListener();
  // }, []);

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
      roomID: roomsList[roomsList.length - 1].roomID + 1,
      roomName: temp,
      Owner: myInfo.uid,
      Members: arrayUnion(myInfo.uid),
      date: getDate(),
    });
    setTitle('');
  };

  const handleEnterRoom = async (data: IRoomInfo) => {
    setEnterRoom(data);
    console.log(data.roomName);
    await updateDoc(doc(db, 'Rooms', data.roomName), {
      Members: arrayUnion(myInfo.uid),
    });
    setIsDirect(false);
    history.push({
      pathname: `/chat/${data.roomName}`,
      // state: { from: data.roomName },
    });
  };

  return (
    <RoomContainer>
      <RoomTitleWrap>
        <RoomTitle onClick={handleToggle}>
          {toggle ? (
            <div>
              <FaCaretDown />
            </div>
          ) : (
            <div>
              <FaCaretRight />
            </div>
          )}
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
              <FaHashtag />
              <p>{data.roomName}</p>
            </Room>
          ))}
        </RoomList>
      ) : null}
    </RoomContainer>
  );
};

export default ChatRoom;

const { RoomContainer, RoomTitle, RoomList, RoomTitleWrap, Btn, Room } = style;
