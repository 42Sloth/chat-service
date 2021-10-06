import React from 'react';
import {DirectMessage, ChatRoom} from "../";
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
