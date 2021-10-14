import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import {
  FollowList,
  MemberList,
  Profile,
} from 'Components/ChatPannel/SidePannel';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { atomClickedUser, atomMyInfo } from 'Recoil/atom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'fBase';
import { TextInputProps } from 'Types/TextInputProps';
import { Style } from './ChatPageStyle';

const ChatPage: React.FC<TextInputProps> = ({ init }) => {
  const clickedUser = useRecoilValue(atomClickedUser);
  const setMyInfo = useSetRecoilState(atomMyInfo);
  const myInfoReset = useResetRecoilState(atomMyInfo);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      if (data) {
        const q = query(collection(db, 'users'), where('uid', '==', data.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          setMyInfo({
            nickname: docData.nickname,
            email: docData.email,
            uid: docData.uid,
            photoURL: docData.photoURL,
          });
        });
      } else {
        myInfoReset();
      }
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
