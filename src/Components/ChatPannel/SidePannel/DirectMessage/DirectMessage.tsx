import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  atomDirectRoomInfo,
  atomRoomCheck,
  atomClickedDirectMsg,
  atomClickedChat,
  atomSelectedRoom,
} from 'Recoil/atom';
import { IDirectRoomInfo } from 'Types';
import { style } from './DirectMessageStyle';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';

const DirectMessage = () => {
  const history = useHistory();
  const dmList = useRecoilValue(atomDirectRoomInfo);
  const [toggle, setToggle] = useState<boolean>(true);
  const setIsDirect = useSetRecoilState(atomRoomCheck);
  const [clickedDM, setClickedDM] =
    useRecoilState<boolean>(atomClickedDirectMsg);
  const [clickedChat, setClickedChat] =
    useRecoilState<boolean>(atomClickedChat);
  const [selectedRoom, setSelectedRoom] =
    useRecoilState<number>(atomSelectedRoom);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleEnterRoom = (data: IDirectRoomInfo) => {
    setSelectedRoom(data.roomID);
    setClickedDM(true);
    setClickedChat(false);
    setIsDirect(true);
    const clickedPath = data.Members[0] + 'Direct' + data.Members[1];
    history.push({
      pathname: `/dm/${clickedPath}`,
    });
  };

  return (
    <DMContainer>
      <Title onClick={handleToggle}>
        {toggle ? <FaCaretDown /> : <FaCaretRight />}
        Direct message
      </Title>
      {toggle ? (
        <DMList>
          {dmList.map((data) => (
            <DM
              key={data.roomID}
              selectedDM={data.roomID === selectedRoom ? true : false}
              clickedDM={clickedDM}
              clickedChat={clickedChat}
              onClick={() => handleEnterRoom(data)}
            >
              @ {data.roomName}
            </DM>
          ))}
        </DMList>
      ) : null}
    </DMContainer>
  );
};

export default DirectMessage;

const { DMContainer, Title, DMList, DM } = style;
