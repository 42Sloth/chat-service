import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import {
  FollowList,
  MemberList,
  Profile,
} from 'Components/ChatPannel/SidePannel';
import {
  useRecoilValue,
  useResetRecoilState,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  atomClickedUser,
  atomEnterRoom,
  atomMyInfo,
  atomRoomsInfo,
} from 'Recoil/atom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from 'fBase';
import { TextInputProps } from 'Types/TextInputProps';
import { Style } from './ChatPageStyle';
import { IRoomInfo } from 'Types';

const ChatPage: React.FC<TextInputProps> = ({ init }) => {
  const clickedUser = useRecoilValue(atomClickedUser);
  const [myInfo, setMyInfo] = useRecoilState(atomMyInfo);
  const myInfoReset = useResetRecoilState(atomMyInfo);
  const setRoomsList = useSetRecoilState(atomRoomsInfo);
  const setEnterRoom = useSetRecoilState(atomEnterRoom);
  const auth = getAuth();

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
          date: docData.date,
        });
      });
      setEnterRoom(temp[0]);
      setRoomsList(temp);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      if (data) {
        const q = await getDoc(doc(db, 'users', data.uid));
        const docData = q.data();
        if (docData) {
          setMyInfo({
            nickname: docData.nickname,
            email: docData.email,
            uid: docData.uid,
            photoURL: docData.photoURL,
          });
        }
      } else {
        myInfoReset();
      }
      roomsListener();
    });
  }, []);

  return (
    <>
      <HeaderPannel />
      <div style={{ display: 'flex' }}>
        <SidePannel />
        <MainPannel />
        {!clickedUser.uid ? (
          <ListPannel>
            <MemberList />
            <FollowList />
          </ListPannel>
        ) : (
          <Profile init={init} />
        )}
      </div>
    </>
  );
};

export default ChatPage;

const { ListPannel } = Style;
