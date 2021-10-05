import React, { useEffect } from 'react';

import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import { MemberList, Profile } from 'Components/ChatPannel/SidePannel';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomClickedUser, atomMyInfo } from 'Recoil/atom';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'fBase';

const ChatPage: React.FC = () => {
  const clickedUser = useRecoilValue(atomClickedUser);
  // const setMyInfo = useSetRecoilState(atomMyInfo);

  // const getMyInfo = async () => {
  //   const auth = getAuth();
  //   if (auth.currentUser) {
  //     const q = query(
  //       collection(db, 'users'),
  //       where('uid', '==', auth.currentUser.uid),
  //     );
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       const docData = doc.data();
  //       console.log(docData);
  //       setMyInfo({
  //         nickname: docData.nickname,
  //         email: docData.email,
  //         uid: docData.uid,
  //         photoURL: docData.photoURL,
  //       });
  //     });
  //   }
  // };
  // useEffect(() => {
  //   getMyInfo();
  // }, []);

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
