import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './NavbarStyle';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { atomMyInfo } from 'Recoil/atom';
import { deleteUser } from 'firebase/auth';
import { query } from '@firebase/firestore';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from 'fBase';

const Navbar: React.FC = () => {
  const [myInfo, setMyInfo] = useRecoilState(atomMyInfo);
  const myInfoReset = useResetRecoilState(atomMyInfo);
  const auth = getAuth();
  const user = auth.currentUser;

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

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem('MyInfo');
  };

  const handleWithdraw = () => {
    if (user) {
      deleteUser(user);
    }
  };

  return (
    <Header>
      <Nav>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/">Game</NavLink>
        </NavMenu>
        <NavBtn>
          {!myInfo.uid ? (
            <>
              <NavBtnLink to="/signin" background="transparent" color="#611f66">
                로그인
              </NavBtnLink>
              <NavBtnLink to="/signup" background="#611f66" color="#fff">
                회원가입
              </NavBtnLink>
            </>
          ) : (
            <>
              <LogOutButton
                background="transparent"
                color="#611f66"
                onClick={handleSignOut}
              >
                로그아웃
              </LogOutButton>
              <WithdrawBtn
                background="#611f66"
                color="#fff"
                onClick={handleWithdraw}
              >
                회원탈퇴
              </WithdrawBtn>
            </>
          )}
        </NavBtn>
      </Nav>
    </Header>
  );
};

export default Navbar;

const {
  Header,
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  LogOutButton,
  WithdrawBtn,
} = style;
