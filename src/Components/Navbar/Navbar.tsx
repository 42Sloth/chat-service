import React from 'react';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './NavbarStyle';

const Navbar: React.FC = () => {
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
<<<<<<< Updated upstream
          <NavBtnLink to="/signin" background="transparent" color="#611f66">
            로그인
          </NavBtnLink>
          <NavBtnLink to="/signup" background="#611f66" color="#fff">
            회원가입
          </NavBtnLink>
=======
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
          {console.log(signCheck)}
>>>>>>> Stashed changes
        </NavBtn>
      </Nav>
    </Header>
  );
};

export default Navbar;

const { Header, Nav, NavLink, NavMenu, NavBtn, NavBtnLink } = style;
