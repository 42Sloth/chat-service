import { db } from 'fBase';
import {
  collection,
  where,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomEnterRoom, atomMyInfo, atomRoomCheck } from 'Recoil/atom';
import { ILocationState, IRoomInfo } from 'Types';
import { style } from './MessageHeaderStyle';

const MessageHeader: React.FC = () => {
  const location = useLocation();
  const from = location.pathname.split('/')[2];
  const isDirect = useRecoilValue(atomRoomCheck);

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
    </Container>
  );
};

export default MessageHeader;

const { Container, JoinRoomList, JoinRoom } = style;
