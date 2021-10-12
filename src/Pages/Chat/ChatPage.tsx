import React, { useEffect } from 'react';

import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import { MemberList, Profile } from 'Components/ChatPannel/SidePannel';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { atomClickedUser, atomMyInfo } from 'Recoil/atom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'fBase';

const ChatPage: React.FC = () => {
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
        {!clickedUser.uid ? <MemberList /> : <Profile />}
      </div>
    </>
  );
};

export default ChatPage;
