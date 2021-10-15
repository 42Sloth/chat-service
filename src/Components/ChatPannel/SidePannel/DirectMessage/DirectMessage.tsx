import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { atomDirectRoomInfo, atomMyInfo, atomMemberList } from 'Recoil/atom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'fBase';
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
  const memberList = useRecoilValue(atomMemberList);
  const [path, setPath] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(true);
  //selected를 나중에 url에 따라서 값이 변경되는 것으로 로직 수정하자.
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    DirectMessagesRoomListener();
  }, []);

  const DirectMessagesRoomListener = () => {
    const q = query(collection(db, 'Direct'), orderBy('date'));
    onSnapshot(q, (query) => {
      const temp: IDirectRoomInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        let myDM = false;
        for (let i = 0; i < docData.Members.length; i++) {
          if (myInfo.uid === docData.Members[i]) {
            myDM = true;
            break;
          }
        }

        if (myDM) {
          setPath(docData.roomName);
          const splitUID: string[] = docData.roomName.split('Direct');
          let directRoomName: string = '';
          for (let i = 0; i < splitUID.length; i++) {
            if (splitUID[i] !== myInfo.uid) {
              for (let j = 0; j < memberList.length; j++) {
                if (splitUID[i] === memberList[j].uid) {
                  directRoomName += memberList[j].nickname;
                }
              }
            }
          }
          temp.push({
            roomID: docData.roomId,
            roomName: directRoomName,
            Members: docData.Members,
            date: docData.date,
          });
        }
      });
      setDmList(temp);
    });
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleEnterRoom = (data: IDirectRoomInfo) => {
    setSelected(data.roomID);

    history.push({
      pathname: `/chat/${path}`,
      state: { from: path },
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
