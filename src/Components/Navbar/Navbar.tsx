import React from 'react';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './NavbarStyle';
import { useRecoilState } from 'recoil';
import { SignCheck } from 'Recoil/atom';

const Navbar: React.FC = () => {
  const [signCheck, setSignCheck] = useRecoilState(SignCheck);

  const auth = getAuth();
  onAuthStateChanged(auth, (data) => {
    if (data) {
      setSignCheck(false);
    } else {
      setSignCheck(true);
    }
  });

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <Header>
      <Nav>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Chat</NavLink>
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
            <LogOutButton
              background="transparent"
              color="#611f66"
              onClick={handleSignOut}
            >
              로그아웃
            </LogOutButton>
          )}
        </NavBtn>
      </Nav>
    </Header>
  );
};

export default Navbar;

const { Header, Nav, NavLink, NavMenu, NavBtn, LogOutButton, NavBtnLink } =
  style;
