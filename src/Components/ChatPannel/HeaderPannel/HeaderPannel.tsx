import React from 'react';

import { Headerstyle } from './HeaderPannelStyle';
import logo from 'Assets/Chatpong_logo_trans.png';
import profile_kbs from 'Assets/profile_kbs.jpg';
import { useRecoilValue } from 'recoil';
import { atomMyInfo } from 'Recoil/atom';

const HeaderPannel: React.FC = () => {
  const myInfo = useRecoilValue(atomMyInfo);
  return (
    <Header>
      <HeaderLink to="/">
        <img src={logo} alt="logo" />
      </HeaderLink>
      <Profile>
        <img src={myInfo.photoURL ? myInfo.photoURL : ''} alt="profile" />
      </Profile>
    </Header>
  );
};

export default HeaderPannel;

const { Header, HeaderLink, Profile } = Headerstyle;
