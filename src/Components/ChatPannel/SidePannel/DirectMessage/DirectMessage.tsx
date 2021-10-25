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
  // path도 기본값 현재 url 넣어줘야함
  const [path, setPath] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(true);
  const setIsDirect = useSetRecoilState(atomRoomCheck);
  const [clickedDM, setClickedDM] =
    useRecoilState<boolean>(atomClickedDirectMsg);
  const [clickedChat, setClickedChat] =
    useRecoilState<boolean>(atomClickedChat);
  //selected를 나중에 url에 따라서 값이 변경되는 것으로 로직 수정하자.
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    DirectMessagesRoomListener();
  }, [myInfo]);

  let id = 0;

  const DirectMessagesRoomListener = () => {
    const q = query(collection(db, 'Direct'), orderBy('date'));
    onSnapshot(q, (query) => {
      const temp: IDirectRoomInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        let myDmList: boolean = false;
        for (let i = 0; i < docData.Members.length; i++) {
          if (myInfo.uid === docData.Members[i]) {
            myDmList = true;
            break;
          }
        }
        if (myDmList) {
          setPath(docData.roomName);
          const splitUID: string[] = docData.roomName.split('Direct');
          let directRoomName: string = '';
          for (let i = 0; i < splitUID.length; i++) {
            if (splitUID[i] !== myInfo.uid) {
              console.log(userList);
              for (let j = 0; j < userList.length; j++) {
                if (splitUID[i] === userList[j].uid) {
                  directRoomName += userList[j].nickname + ' ';
                }
              }
            }
          }

          temp.push({
            roomID: id,
            roomName: directRoomName,
            Members: docData.Members,
            date: docData.date,
          });
          id = id + 1;
        }
      });
      setDmList(temp);
    });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleEnterRoom = (data: IDirectRoomInfo) => {
    setSelected(data.roomID); // 선택된 roomID
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
              selectedDM={data.roomID === selected ? true : false}
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
