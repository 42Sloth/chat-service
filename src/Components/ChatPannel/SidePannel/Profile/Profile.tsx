import React, { ReactEventHandler, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { atomClickedUser, atomMyInfo } from 'Recoil/atom';
import { getAuth, signOut, updateProfile } from '@firebase/auth';
import { FaTimes, FaPaperPlane, FaEdit, FaUserPlus } from 'react-icons/fa';
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
import { TextInputProps } from 'Types/TextInputProps';

const Profile = ({ init }: TextInputProps) => {
  const [text, setText] = useState(init);
  const [editable, setEditable] = useState(false);
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

  const editOn = () => {
    setEditable(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditable(!editable);
    }
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
          {editable ? (
            <input
              type="text"
              value={text}
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <UserName>{clickedUserInfo.nickname}</UserName>
          )}
          <UserEmail>{clickedUserInfo.email}</UserEmail>
        </UserInfo>
        <BtnGroup>
          <Btn>
            <BtnIcon>
              <FaPaperPlane />
            </BtnIcon>
            <span>Direct Message</span>
          </Btn>
          {myInfo.uid !== clickedUserInfo.uid && (
            <Btn>
              <BtnIcon>
                <FaUserPlus />
              </BtnIcon>
              <span>친구 추가</span>
            </Btn>
          )}
          {myInfo.uid === clickedUserInfo.uid && (
            <Btn onClick={() => editOn()}>
              <BtnIcon>
                <FaEdit />
              </BtnIcon>
              <span>닉네임 변경</span>
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
