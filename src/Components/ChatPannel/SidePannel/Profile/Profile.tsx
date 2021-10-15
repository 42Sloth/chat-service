import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import { atomClickedUser, atomMyInfo, atomDirectRoomInfo } from 'Recoil/atom';
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
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from 'fBase';
import { getDate } from 'Utils/getDate';
import { TextInputProps } from 'Types/TextInputProps';

const Profile = ({ init }: TextInputProps) => {
  const [text, setText] = useState(init);
  const [editable, setEditable] = useState(false);
  const auth = getAuth();
  const history = useHistory();
  const resetClickedUser = useResetRecoilState(atomClickedUser);
  const [dmList, setDmList] = useRecoilState(atomDirectRoomInfo);
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
    const docRef = doc(db, 'users', `${clickedUserInfo.uid}`);
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

  const handleClickDirectMsg = async () => {
    const docTitle: string = clickedUserInfo.uid + 'Direct' + myInfo.uid;
    let id = 0;
    if (dmList.length > 0) id += dmList.length + 1;
    await setDoc(doc(db, 'Direct', docTitle), {
      roomID: id,
      roomName: docTitle,
      Members: [myInfo.uid, clickedUserInfo.uid],
      date: getDate(),
    });

    history.push({
      pathname: `/chat/${docTitle}`,
      state: { from: docTitle },
    });
  };
  const editOn = () => {
    setEditable(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleUpdateNickname = async () => {
    const editName = doc(db, 'users', `${clickedUserInfo.uid}`);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: text,
      });
    }
    await updateDoc(editName, {
      nickname: text,
    });
    setEditable(!editable);
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
            <div>
              <input
                type="text"
                value={text}
                onChange={(e) => handleChange(e)}
                placeholder="변경할 닉네임을 입력하세요."
              />
              <button onClick={handleUpdateNickname}>변경</button>
            </div>
          ) : (
            <UserName>{clickedUserInfo.nickname}</UserName>
          )}
          <UserEmail>{clickedUserInfo.email}</UserEmail>
        </UserInfo>
        <BtnGroup>
          <Btn onClick={handleClickDirectMsg}>
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
