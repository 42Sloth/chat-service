import { arrayRemove, deleteDoc, onSnapshot, query } from '@firebase/firestore';
import { db } from 'fBase';
import { collection, where, updateDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomEnterRoom, atomMyInfo, atomRoomsInfo } from 'Recoil/atom';
import { ILocationState, IRoomInfo } from 'Types';
import { style } from './MessageHeaderStyle';

const MessageHeader: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const roomName = location.pathname.split('/')[2];
  const myInfo = useRecoilValue(atomMyInfo);
  const roomsList = useRecoilValue(atomRoomsInfo);

  const handleExitRoom = async () => {
    const roomInfo = roomsList.find((room) => room.roomName === roomName);
    if (roomInfo && myInfo.uid === roomInfo.Owner) {
      if (roomInfo.Members.length === 1) {
        await deleteDoc(doc(db, 'Rooms', roomName));
      } else {
        await updateDoc(doc(db, 'Rooms', roomName), {
          Owner: roomInfo.Members[1],
          Members: arrayRemove(myInfo.uid),
        });
      }
    } else {
      await updateDoc(doc(db, 'Rooms', roomName), {
        Members: arrayRemove(myInfo.uid),
      });
    }
    history.push({
      pathname: `/chat/lobby`,
      // state: { from: data.roomName },
    });
  };

  // const history = useHistory();
  // const myInfo = useRecoilValue(atomMyInfo);
  // const setEnterRoom = useSetRecoilState(atomEnterRoom);
  // const enterRoom = useRecoilValue(atomEnterRoom);
  // const [joinRooms, setJoinRooms] = useState<IRoomInfo[]>([]);

  // const joinRoomListener = () => {
  //   const q = query(
  //     collection(db, 'Rooms'),
  //     where('Members', 'array-contains', myInfo.uid),
  //   );
  //   onSnapshot(q, (query) => {
  //     const temp: IRoomInfo[] = [];
  //     query.forEach((doc) => {
  //       const docData = doc.data();
  //       console.log(docData);
  //       temp.push({
  //         roomID: docData.roomID,
  //         roomName: docData.roomName,
  //         Owner: docData.Owner,
  //         Members: docData.Members,
  //         date: docData.date,
  //       });
  //     });
  //     console.log(temp);
  //     setJoinRooms(temp);
  //   });
  // };

  // useEffect(() => {
  //   joinRoomListener();
  // }, []);

  // const handleEnterRoom = (data: IRoomInfo) => {
  //   setEnterRoom(data);
  //   history.push({
  //     pathname: `/chat/${data.roomName}`,
  //     state: data.roomName,
  //   });
  // };

  return (
    <Container>
      <JoinRoom># {roomName}</JoinRoom>
      <ExitRoom onClick={handleExitRoom}>Exit</ExitRoom>
    </Container>
  );
};

export default MessageHeader;

const { Container, JoinRoom, ExitRoom } = style;
