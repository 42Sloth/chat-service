import React from 'react';

import { Headerstyle } from './HeaderPannelStyle';
import logo from 'Assets/Chatpong_logo_trans.png';
import profile_kbs from 'Assets/profile_kbs.jpg';

const HeaderPannel: React.FC = () => {
  return (
    <Header>
      <HeaderLink to="/">
        <img src={logo} alt="logo" />
      </HeaderLink>
      <Profile>
        <img src={profile_kbs} alt="profile" />
      </Profile>
    </Header>
  );
};

export default HeaderPannel;

const { Header, HeaderLink, Profile } = Headerstyle;
