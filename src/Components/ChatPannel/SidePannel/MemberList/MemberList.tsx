import React, { useEffect, useState } from 'react';
import { MlStyle } from './MemberListStyle';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  atomMemberList,
  atomClickedUser,
  atomRoomsInfo,
  atomUserList,
} from 'Recoil/atom';
import { ILocationState, IUserInfo } from 'Types';
import FollowButton from 'Components/ChatPannel/SidePannel/FollowButton/FollowButton';
import MemberListLi from './MemberListLi';
import { useLocation } from 'react-router';
import { FaStar } from 'react-icons/fa';

const MemberList = () => {
  const location = useLocation<ILocationState>();
  const setClickedUser = useSetRecoilState(atomClickedUser);
  const from = location.pathname.split('/')[2];
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const roomsList = useRecoilValue(atomRoomsInfo);
  const userList = useRecoilValue(atomUserList);
  const roomInfo = roomsList.find((room) => room.roomName === from);
  const [isLoad, setIsLoad] = useState(false);

  const memberListListener = () => {
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
            {roomInfo && roomInfo.Owner === data.uid && (
              <FaStar style={{ color: '#ff4545' }} />
            )}
            <FollowButton data={data} />
          </div>
        ))}
      </MemberLists>
    </Container>
  );
};

export default MemberList;

const { Container, Title, MemberLists } = MlStyle;
