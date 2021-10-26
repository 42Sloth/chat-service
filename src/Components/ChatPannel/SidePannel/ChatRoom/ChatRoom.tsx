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
  atomClickedDirectMsg,
  atomClickedChat,
  atomSelectedRoom,
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
  const [clickedDM, setClickedDM] =
    useRecoilState<boolean>(atomClickedDirectMsg);
  const [clickedChat, setClickedChat] =
    useRecoilState<boolean>(atomClickedChat);
  const [selected, setSelected] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] =
    useRecoilState<number>(atomSelectedRoom);

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

  const handleCreateRoom = async () => {
    const temp = title;
    setAdd(false);
    let maxId = 0;
    for (let i = 0; i < roomsList.length; i++) {
      maxId = Math.max(maxId, roomsList[i].roomID);
    }
    maxId = maxId === 0 ? 0 : maxId + 1;

    await setDoc(doc(db, 'Rooms', temp), {
      roomID: maxId,
      roomName: temp,
      Owner: myInfo.uid,
      Members: arrayUnion(myInfo.uid),
      date: getDate(),
    });
    setTitle('');
  };

  const handleEnterRoom = async (data: IRoomInfo) => {
    setSelectedRoom(data.roomID); // 선택된 roomID
    setClickedDM(false); // dm room 클릭
    setClickedChat(true); // chat room 클릭
    setIsDirect(false); // fb document 구분
    console.log(roomsList);
    await updateDoc(doc(db, 'Rooms', data.roomName), {
      Members: arrayUnion(myInfo.uid),
    });
    setEnterRoom(data);
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
            // onKeyPress={handleCreateRoom}
          />
          <button onClick={handleCreateRoom}>등록</button>
        </>
      )}
      {toggle ? (
        <RoomList>
          {roomsList.map((data) => (
            <Room
              key={data.roomID}
              onClick={() => handleEnterRoom(data)}
              selectedDM={data.roomID === selectedRoom ? true : false}
              clickedDM={clickedDM}
              clickedChat={clickedChat}
            >
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
