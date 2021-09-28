import React from 'react';

import FooterMenu from './FooterMenu';

import { style } from './FooterStyle';
import logo from 'Assets/Chatpong_logo_trans.png';

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
