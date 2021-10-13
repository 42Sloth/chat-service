import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { atomClickedUser, atomMyInfo } from 'Recoil/atom';
import { getAuth, signOut, updateProfile } from '@firebase/auth';
import { FaTimes, FaPaperPlane, FaEdit } from 'react-icons/fa';
import { style } from './ProfileStyle';
import { MlStyle } from 'Components/ChatPannel/SidePannel/MemberList/MemberListStyle';
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from '@firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'fBase';

const Profile = () => {
  const auth = getAuth();
  const history = useHistory();
  const resetClickedUser = useResetRecoilState(atomClickedUser);
  const clickedUserInfo = useRecoilValue(atomClickedUser);
  const myInfo = useRecoilValue(atomMyInfo);
  const inputOpenImageRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    resetClickedUser();
  };

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem('MyInfo');
    history.push('/');
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current?.click();
  };

  const handleUploadImage = (event: any) => {
    const storage = getStorage();
    const file = event.target.files[0];
    const imageRef = ref(storage, 'images/' + file.name);
    const metadata = {
      contentType: 'image/jpeg',
    };
    const docRef = doc(db, 'users', `${clickedUserInfo.nickname}`);

    uploadBytesResumable(imageRef, file, metadata)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          let downloadURL = url;
          const auth = getAuth();

          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            });
          }
          updateDoc(docRef, {
            photoURL: downloadURL,
          });
        });
      })
      .catch((error) => {
        alert(error);
      });
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
        <img
          src={clickedUserInfo.photoURL ? clickedUserInfo.photoURL : ''}
          alt="profile"
          onClick={handleOpenImageRef}
        />
        <input
          onChange={handleUploadImage}
          accept="image.jpeg, image/png"
          type="file"
          style={{ display: 'none' }}
          ref={inputOpenImageRef}
        />
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
