import React, { useEffect } from 'react';
import { MlStyle } from './MemberListStyle';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  atomMemberList,
  atomClickedUser,
  atomRoomsInfo,
  atomUserList,
  atomRoomCheck,
  atomFollowList,
  atomMyInfo,
} from 'Recoil/atom';
import { ILocationState, IUserInfo } from 'Types';
import FollowButton from 'Components/ChatPannel/SidePannel/FollowButton/FollowButton';
import MemberListLi from './MemberListLi';
import { useLocation } from 'react-router';

const MemberList = () => {
  const location = useLocation<ILocationState>();
  const setClickedUser = useSetRecoilState(atomClickedUser);
  const from = location.pathname.split('/')[2];
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const roomsList = useRecoilValue(atomRoomsInfo);
  const isDirect = useRecoilValue(atomRoomCheck);
  const dmMembers = location.pathname.split('/')[2].split('Direct');
  const userList = useRecoilValue(atomUserList);
  const roomInfo = roomsList.find((room) => room.roomName === from);
  const myInfo = useRecoilValue(atomMyInfo);
  const followingList = useRecoilValue(atomFollowList);

  const memberListListener = () => {
    const temp: IUserInfo[] = [];
    if (roomInfo && !isDirect) {
      roomInfo.Members.forEach((member) => {
        const joinedUser = userList.find((user) => user.uid === member);
        joinedUser && temp.push(joinedUser);
      });
    } else if (!roomInfo && isDirect) {
      dmMembers.forEach((member) => {
        const joinedUser = userList.find((user) => user.uid === member);
        joinedUser && temp.push(joinedUser);
      });
    }
    setMemberList(temp);
  };

  const addFollowingListener = async () => {};

  const handleClickedUser = (data: IUserInfo) => {
    setClickedUser(data);
  };

  useEffect(() => {
    memberListListener();
    addFollowingListener();
  }, [from, roomsList, userList, isDirect]);

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
              data={data}
            />

            {myInfo.uid !== data.uid && (
              <FollowButton
                data={data}
                isFollow={
                  followingList.find((user) => user.uid === data.uid)
                    ? true
                    : false
                }
              />
            )}
          </div>
        ))}
      </MemberLists>
    </Container>
  );
};

export default MemberList;

const { Container, Title, MemberLists } = MlStyle;
