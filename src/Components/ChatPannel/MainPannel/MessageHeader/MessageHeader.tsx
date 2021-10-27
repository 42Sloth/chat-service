import React, { useEffect, useState } from 'react';
import { doc, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore';
import { db } from 'fBase';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  atomMyInfo,
  atomRoomsInfo,
  atomRoomCheck,
  atomDirectRoomInfo,
} from 'Recoil/atom';
import { IDirectRoomInfo } from 'Types';
import { style } from './MessageHeaderStyle';

const MessageHeader: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const from = location.pathname.split('/')[2];
  const [isDirect, setIsDirect] = useRecoilState(atomRoomCheck);
  const myInfo = useRecoilValue(atomMyInfo);
  const roomsList = useRecoilValue(atomRoomsInfo);
  const dmList = useRecoilValue(atomDirectRoomInfo);
  const [dmRoomName, setDmRoomName] = useState<string>('');

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'dm') {
      setIsDirect(true);
      setDirectRoomName();
    }
  }, [from]);

  const setDirectRoomName = () => {
    const fromSplit: string = from.split('Direct')[0] + from.split('Direct')[1];

    const currentRoom: IDirectRoomInfo | undefined = dmList.find(
      (dmRoom) => dmRoom.Members[0] + dmRoom.Members[1] === fromSplit,
    );
    if (currentRoom) {
      setDmRoomName(currentRoom.roomName);
    }
  };

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
    });
  };

  return (
    <Container>
      <JoinRoom> {isDirect ? `@ ${dmRoomName}` : `# ${from}`}</JoinRoom>
      <ExitRoom onClick={handleExitRoom}>Exit</ExitRoom>
    </Container>
  );
};

export default MessageHeader;

const { Container, JoinRoom, ExitRoom } = style;
