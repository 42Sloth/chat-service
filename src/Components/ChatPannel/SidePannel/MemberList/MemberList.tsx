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
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import {
  atomMemberList,
  atomClickedUser,
  atomEnterRoom,
  atomFollowCheck,
  atomRoomsInfo,
  atomUserList,
} from 'Recoil/atom';
import { ILocationState, IUserInfo } from 'Types';
import { selectorMemberList } from 'Recoil/selector';
import FollowButton from 'Components/ChatPannel/SidePannel/FollowButton/FollowButton';
import MemberListLi from './MemberListLi';
import { useLocation } from 'react-router';

const MemberList = () => {
  const location = useLocation<ILocationState>();
  // const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const setClickedUser = useSetRecoilState(atomClickedUser);
  const enterRoom = useRecoilValue(atomEnterRoom);
  const from = location.pathname.split('/')[2];
  // const memberList = useRecoilValue(selectorMemberList);
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const roomsList = useRecoilValue(atomRoomsInfo);
  const userList = useRecoilValue(atomUserList);

  // const memberListListener = () => {
  //   const q = query(collection(db, 'users'));
  //   onSnapshot(q, (query) => {
  //     const temp: IUserInfo[] = [];
  //     query.forEach((doc) => {
  //       const docData = doc.data();
  //       // if (enterRoom.Members.includes(docData.uid)) {
  //       temp.push({
  //         nickname: docData.nickname,
  //         email: docData.email,
  //         uid: docData.uid,
  //         photoURL: docData.photoURL,
  //       });
  //       // }
  //     });
  //     setMemberList(temp);
  //   });
  // };
  // console.log(memberList);

  const memberListListener = () => {
    const roomInfo = roomsList.find((room) => room.roomName === from);
    const temp: IUserInfo[] = [];
    if (roomInfo) {
      roomInfo.Members.forEach((member) => {
        const joinedUser = userList.find((user) => user.uid === member);
        joinedUser && temp.push(joinedUser);
      });
    }
    setMemberList(temp);
  };

  const handleClickedUser = (data: IUserInfo) => {
    setClickedUser(data);
  };

  useEffect(() => {
    memberListListener();
  }, [from, roomsList, userList]);

  return (
    <Container>
      <Title>
        {/* <div>
          <FaCaretRight />
        </div> */}
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
