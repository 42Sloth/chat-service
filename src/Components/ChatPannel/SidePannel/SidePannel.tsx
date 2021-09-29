import React from 'react';
import ChatRoom from './ChatRoom';
import DirectMessage from './DirectMessage';
import { style } from './SidePannelStyle';

const SidePannel = () => {
  return (
    <SideContainer>
      <ChatRoom />
      <DirectMessage />
    </SideContainer>
  );
};

export default SidePannel;

const { SideContainer } = style;
