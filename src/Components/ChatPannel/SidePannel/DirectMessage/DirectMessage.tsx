import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  atomDirectRoomInfo,
  atomMyInfo,
  atomUserList,
  atomRoomCheck,
  atomClickedDirectMsg,
  atomClickedChat,
  atomSelectedRoom,
} from 'Recoil/atom';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'fBase';
import { getAuth } from 'firebase/auth';

import { IDirectRoomInfo } from 'Types';
import { style } from './DirectMessageStyle';
import {
  FaCaretRight,
  FaCaretDown,
  FaHashtag,
  FaPlusSquare,
} from 'react-icons/fa';

const DirectMessage = () => {
  const history = useHistory();
  const [dmList, setDmList] = useRecoilState(atomDirectRoomInfo);
  const myInfo = useRecoilValue(atomMyInfo);
  const userList = useRecoilValue(atomUserList);
  const [toggle, setToggle] = useState<boolean>(true);
  const setIsDirect = useSetRecoilState(atomRoomCheck);
  const [clickedDM, setClickedDM] =
    useRecoilState<boolean>(atomClickedDirectMsg);
  const [clickedChat, setClickedChat] =
    useRecoilState<boolean>(atomClickedChat);
  const [selected, setSelected] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] =
    useRecoilState<number>(atomSelectedRoom);

  // useEffect(() => {
  //   //DirectMessagesRoomListener();
  // }, [myInfo]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleEnterRoom = (data: IDirectRoomInfo) => {
    setSelectedRoom(data.roomID); // 선택된 roomID
    setClickedDM(true); // dm room 클릭
    setClickedChat(false); // chat room 클릭
    setIsDirect(true); // fb document 구분
    const clickedPath = data.Members[0] + 'Direct' + data.Members[1];
    history.push({
      pathname: `/dm/${clickedPath}`,
      // state: { from: clickedPath },
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
              {/* # <img src={data.thumbnail} /> */}@ {data.roomName}
            </DM>
          ))}
        </DMList>
      ) : null}
    </DMContainer>
  );
};

export default DirectMessage;

const { DMContainer, Title, DMList, DM } = style;
