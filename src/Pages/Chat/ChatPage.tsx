import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import React from 'react';
const ChatPage: React.FC = () => {
  return (
    <>
      <HeaderPannel />
      <div style={{ display: 'flex' }}>
        <SidePannel />
        <MainPannel />
      </div>
    </>
  );
};

export default ChatPage;
