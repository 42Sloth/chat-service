import {
  collection,
  where,
  orderBy,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { arrayRemove, deleteDoc } from '@firebase/firestore';
import { db } from 'fBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  atomEnterRoom,
  atomMyInfo,
  atomRoomsInfo,
  atomRoomCheck,
  atomDirectRoomInfo,
} from 'Recoil/atom';
import { ILocationState, IRoomInfo } from 'Types';
import { style } from './MessageHeaderStyle';

const MessageHeader: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const from = location.pathname.split('/')[2];
  const isDirect = useRecoilValue(atomRoomCheck);
  const myInfo = useRecoilValue(atomMyInfo);
  const roomsList = useRecoilValue(atomRoomsInfo);
  const handleExitRoom = async () => {
    const roomInfo = roomsList.find((room) => room.roomName === from);
    if (roomInfo && myInfo.uid === roomInfo.Owner) {
      if (roomInfo.Members.length === 1) {
        await deleteDoc(doc(db, 'Rooms', from));
      } else {
        await updateDoc(doc(db, 'Rooms', from), {
          Owner: roomInfo.Members[1],
          Members: arrayRemove(myInfo.uid),
        });
      }
    } else {
      await updateDoc(doc(db, 'Rooms', from), {
        Members: arrayRemove(myInfo.uid),
      });
    }
    history.push({
      pathname: `/chat/lobby`,
      // state: { from: data.roomName },
    });
  };

  // const setEnterRoom = useSetRecoilState(atomEnterRoom);
  // const enterRoom = useRecoilValue(atomEnterRoom);
  // const [joinRooms, setJoinRooms] = useState<IRoomInfo[]>([]);

  useEffect(() => {
    if (isDirect) {
      setDirectRoomName();
    }
  }, []);

  const setDirectRoomName = () => {
    const q = query(collection(db, 'Direct'), orderBy('date'));
  };

  console.log(isDirect);
  return (
    <Container>
      {/* <JoinRoomList>
        {joinRooms.map((data) => {
          return (
            <JoinRoom
              key={data.roomID}
              onClick={() => {
                handleEnterRoom(data);
              }}
            >
              # {data.roomName}
            </JoinRoom>
          );
        })}
      </JoinRoomList> */}
      <JoinRoom># {isDirect ? '나와라잇' : from}</JoinRoom>
      <ExitRoom onClick={handleExitRoom}>Exit</ExitRoom>
    </Container>
  );
};

export default MessageHeader;

const { Container, JoinRoom, ExitRoom } = style;
