import React from 'react';
import { style } from './FooterStyle';
import logo from 'Assets/Chatpong_logo_trans.png';
import FooterMenu from './FooterMenu';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterNavMenu>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavMenu>
          <FooterMenu />
        </NavMenu>
      </FooterNavMenu>
    </FooterContainer>
  );
};

export default Footer;

const { FooterContainer, FooterNavMenu, NavLink, NavMenu } = style;
