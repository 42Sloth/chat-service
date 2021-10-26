import React from 'react';
import { DirectMessage, ChatRoom } from '../';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './SidePannelStyle';

const SidePannel = () => {
  return (
    <SideContainer>
      <HeaderContainer>
        <HeaderLink to="/">
          <img src={logo} alt="logo" />
        </HeaderLink>
      </HeaderContainer>
      <ChatRoom />
      <DirectMessage />
    </SideContainer>
  );
};

export default SidePannel;

const { SideContainer, HeaderContainer, HeaderLink } = style;
