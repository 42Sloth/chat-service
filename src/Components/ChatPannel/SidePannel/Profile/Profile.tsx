import React from 'react';

import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { atomClickedUser, atomMyInfo } from 'Recoil/atom';
import { getAuth, signOut } from '@firebase/auth';

import { FaTimes, FaPaperPlane, FaEdit } from 'react-icons/fa';
import { style } from './ProfileStyle';
import { MlStyle } from 'Components/ChatPannel/SidePannel/MemberList/MemberListStyle';
import profile_kbs from 'Assets/profile_kbs.jpg';

const Profile = () => {
  const auth = getAuth();
  const history = useHistory();
  const resetClickedUser = useResetRecoilState(atomClickedUser);
  const clickedUserInfo = useRecoilValue(atomClickedUser);
  const myInfo = useRecoilValue(atomMyInfo);

  const handleClose = () => {
    resetClickedUser();
  };

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem('MyInfo');
    history.push('/');
  };

  return (
    <Container>
      <ProfileTitle>
        <h6>Profile</h6>
        <div onClick={handleClose}>
          <FaTimes />
        </div>
      </ProfileTitle>
      <User>
        <img src={profile_kbs} alt="profile" />
        <UserInfo>
          <UserName>{clickedUserInfo.nickname}</UserName>
          <UserEmail>{clickedUserInfo.email}</UserEmail>
        </UserInfo>
        <BtnGroup>
          <Btn>
            <BtnIcon>
              <FaPaperPlane />
            </BtnIcon>
            <span>Direct Message</span>
          </Btn>
          {myInfo.uid === clickedUserInfo.uid && (
            <Btn>
              <BtnIcon>
                <FaEdit />
              </BtnIcon>
              <span>Edit Profile</span>
            </Btn>
          )}
        </BtnGroup>
      </User>
      {myInfo.uid === clickedUserInfo.uid && (
        <LogoutBtn onClick={handleSignOut}>로그아웃</LogoutBtn>
      )}
    </Container>
  );
};

export default Profile;

const { Container } = MlStyle;
const {
  User,
  UserInfo,
  UserName,
  UserEmail,
  BtnGroup,
  Btn,
  BtnIcon,
  ProfileTitle,
  LogoutBtn,
} = style;
