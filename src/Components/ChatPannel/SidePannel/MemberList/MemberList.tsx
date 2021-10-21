import React, { useEffect, useState } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from 'fBase';
import { MlStyle } from './MemberListStyle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { atomMemberList, atomClickedUser, atomFollowCheck } from 'Recoil/atom';
import { IUserInfo } from 'Types';
import FollowButton from 'Components/ChatPannel/FollowButton/FollowButton';
import MemberListLi from './MemberListLi';

const MemberList = () => {
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const setClickedUser = useSetRecoilState(atomClickedUser);

  const memberListListener = () => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (query) => {
      const temp: IUserInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        temp.push({
          nickname: docData.nickname,
          email: docData.email,
          uid: docData.uid,
          photoURL: docData.photoURL,
        });
      });
      setMemberList(temp);
    });
  };

  const handleClickedUser = (data: IUserInfo) => {
    setClickedUser(data);
  };

  useEffect(() => {
    memberListListener();
  }, []);

  return (
    <Container>
      <Title>
        <div>
          <FaCaretRight />
        </div>
        <h6>All Member</h6>
      </Title>
      <MemberLists>
        {memberList.map((data, idx) => (
          <div key={idx}>
            <MemberListLi
              onClick={() => handleClickedUser(data)}
              photoURL={data.photoURL}
              nickname={data.nickname}
            />
            <FollowButton data={data} />
          </div>
        ))}
      </MemberLists>
    </Container>
  );
};

export default MemberList;

const { Container, Title, MemberLists } = MlStyle;
