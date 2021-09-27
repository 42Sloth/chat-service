import React, { useEffect, useState } from 'react';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './NavbarStyle';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';

const Navbar: React.FC = () => {
  const [signCheck, setSignCheck] = useState<boolean>(false);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
    setSignCheck(false);
  };

  const validateLogIn = async () => {
    const auth = getAuth();
    await onAuthStateChanged(auth, (data) => {
      if (data) {
        setSignCheck(true);
      } else {
        setSignCheck(false);
      }
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
            <button onClick={handleSignOut}>로그아웃</button>
          ) : (
            <>
              <NavBtnLink to="/signin" background="transparent" color="#611f66">
                로그인
              </NavBtnLink>
              <NavBtnLink to="/signup" background="#611f66" color="#fff">
                회원가입
              </NavBtnLink>
            </>
          )}
        </NavBtn>
      </Nav>
    </Header>
  );
};

export default Navbar;

const { Header, Nav, NavLink, NavMenu, NavBtn, NavBtnLink } = style;
