import React, { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signOut,
  browserSessionPersistence,
} from '@firebase/auth';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './NavbarStyle';

const Navbar: React.FC = () => {
  const [signCheck, setSignCheck] = useState<boolean>();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
    setSignCheck(true);
  };

  const validateLogIn = () => {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence).then(() => {
      onAuthStateChanged(auth, (data) => {
        if (data) {
          setSignCheck(false);
        } else {
          setSignCheck(true);
        }
      });
    });
  };

  useEffect(() => {
    validateLogIn();
  }, []);

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
