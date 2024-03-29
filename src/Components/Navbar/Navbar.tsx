import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './NavbarStyle';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { atomMyInfo } from 'Recoil/atom';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from 'fBase';

const Navbar: React.FC = () => {
  const [myInfo, setMyInfo] = useRecoilState(atomMyInfo);
  const myInfoReset = useResetRecoilState(atomMyInfo);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      if (data) {
        const q = await getDoc(doc(db, 'users', data.uid));
        const docData = q.data();
        if (docData) {
          setMyInfo({
            nickname: docData.nickname,
            email: docData.email,
            uid: docData.uid,
            photoURL: docData.photoURL,
          });
        }
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
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      deleteDoc(doc(db, 'users', user.uid));
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
          <NavLink to="/chat/lobby">Chat</NavLink>
          {/* <NavLink to="/">Game</NavLink> */}
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
