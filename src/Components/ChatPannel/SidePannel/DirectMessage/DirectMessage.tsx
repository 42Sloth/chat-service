import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  atomDirectRoomInfo,
  atomRoomCheck,
  atomClickedDirectMsg,
  atomClickedChat,
  atomSelectedRoom,
  atomMyInfo,
} from 'Recoil/atom';
import { IDirectRoomInfo } from 'Types';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from 'fBase';
import { style } from './DirectMessageStyle';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';

const DirectMessage = () => {
  const history = useHistory();
  const [dmList, setDmList] = useRecoilState(atomDirectRoomInfo);
  const [toggle, setToggle] = useState<boolean>(true);
  const setIsDirect = useSetRecoilState(atomRoomCheck);
  const [clickedDM, setClickedDM] =
    useRecoilState<boolean>(atomClickedDirectMsg);
  const [clickedChat, setClickedChat] =
    useRecoilState<boolean>(atomClickedChat);
  const [selectedRoom, setSelectedRoom] =
    useRecoilState<number>(atomSelectedRoom);
  // const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
  // const myInfo = useRecoilValue(atomMyInfo);

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

  const handleDeleteList = (data: IDirectRoomInfo) => {
    const roomName = data.Members[0] + 'Direct' + data.Members[1];
    deleteDoc(doc(db, 'Direct', roomName));
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
              @ {data.roomName}{' '}
              <DeleteBox onClick={() => handleDeleteList(data)}>
                <AiOutlineDelete />
              </DeleteBox>
            </DM>
          ))}
        </DMList>
      ) : null}
    </DMContainer>
  );
};

export default DirectMessage;

const { DMContainer, Title, DMList, DM, DeleteBox } = style;
