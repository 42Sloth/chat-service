import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import MemberList from 'Components/ChatPannel/SidePannel/MemberList';

import React from 'react';
const ChatPage: React.FC = () => {
  return (
    <>
      <HeaderPannel />
      <div style={{ display: 'flex' }}>
        <SidePannel />
        <MainPannel />
        <MemberList />
      </div>
    </>
  );
};

export default ChatPage;
