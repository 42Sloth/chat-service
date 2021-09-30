import React, { useState } from 'react';

import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import { MemberList, Profile } from 'Components/ChatPannel/SidePannel';
import {useRecoilValue} from "recoil";
import {atomClickedUser} from 'Recoil/atom';

const ChatPage: React.FC = () => {
  const clickedUser = useRecoilValue(atomClickedUser)

  return (
    <>
      <HeaderPannel />
      <div style={{ display: 'flex' }}>
        <SidePannel />
        <MainPannel />
        {!clickedUser.nickname ? <MemberList /> : <Profile />}
      </div>
    </>
  );
};

export default ChatPage;