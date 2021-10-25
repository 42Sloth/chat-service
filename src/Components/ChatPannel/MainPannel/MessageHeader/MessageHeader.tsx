import { onSnapshot, query } from '@firebase/firestore';
import { db } from 'fBase';
import { collection, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomEnterRoom, atomMyInfo } from 'Recoil/atom';
import { ILocationState, IRoomInfo } from 'Types';
import { style } from './MessageHeaderStyle';

const MessageHeader: React.FC = () => {
  const location = useLocation();
  const from = location.pathname.split('/')[2];
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
      <JoinRoom># {from}</JoinRoom>
    </Container>
  );
};

export default MessageHeader;

const { Container, JoinRoomList, JoinRoom } = style;
