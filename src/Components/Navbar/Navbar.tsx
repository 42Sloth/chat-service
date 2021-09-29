import React from 'react';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './NavbarStyle';
import { useRecoilState } from 'recoil';
import { SignCheck } from 'Recoil/atom';
import { deleteUser } from 'firebase/auth';

const Navbar: React.FC = () => {
  const [signCheck, setSignCheck] = useRecoilState(SignCheck);
  const auth = getAuth();
  const user = auth.currentUser;

  onAuthStateChanged(auth, (data) => {
    if (data) {
      setSignCheck(false);
    } else {
      setSignCheck(true);
    }
  });

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleWithdraw = () => {
    if (user) {
      deleteUser(user);
      setSignCheck(false);
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
          {signCheck ? (
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
