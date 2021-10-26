import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MainPannel, HeaderPannel, SidePannel } from 'Components';
import {
  FollowList,
  MemberList,
  Profile,
} from 'Components/ChatPannel/SidePannel';
import {
  useRecoilValue,
  useResetRecoilState,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  atomClickedUser,
  atomEnterRoom,
  atomMyInfo,
  atomRoomsInfo,
  atomUserList,
  atomSelectedRoom,
  atomClickedChat,
  atomClickedDirectMsg,
  atomDirectRoomInfo,
} from 'Recoil/atom';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from 'fBase';
import { TextInputProps } from 'Types/TextInputProps';
import { Style } from './ChatPageStyle';
import { ILocationState, IRoomInfo, IUserInfo, IDirectRoomInfo } from 'Types';

const ChatPage: React.FC<TextInputProps> = ({ init }) => {
  const clickedUser = useRecoilValue(atomClickedUser);
  const [myInfo, setMyInfo] = useRecoilState(atomMyInfo);
  const myInfoReset = useResetRecoilState(atomMyInfo);
  const [roomsList, setRoomsList] = useRecoilState(atomRoomsInfo);
  const [enterRoom, setEnterRoom] = useRecoilState(atomEnterRoom);
  const [userList, setUserList] = useRecoilState(atomUserList);
  const [dmList, setDmList] = useRecoilState(atomDirectRoomInfo);
  const [clickedDM, setClickedDM] =
    useRecoilState<boolean>(atomClickedDirectMsg);
  const [clickedChat, setClickedChat] =
    useRecoilState<boolean>(atomClickedChat);
  const [selectedRoom, setSelectedRoom] =
    useRecoilState<number>(atomSelectedRoom);
  const auth = getAuth();
  const location = useLocation<ILocationState>();

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      if (data) {
        const q = await getDoc(doc(db, 'users', data.uid));
        const docData = q.data();
        if (docData) {
          setMyInfo({
            nickname: docData.nickname,
            email: docData.email,
            uid: docData.uid,
            photoURL: docData.photoURL,
          });
        }
      } else {
        myInfoReset();
      }
    });
    roomsListener();
    userListListener();
    directMessagesRoomListener();
  }, []);

  let dmId = 0;
  const directMessagesRoomListener = () => {
    const q = query(collection(db, 'Direct'), orderBy('date'));
    const selectedRoom = location.pathname.split('/')[2];

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
          const splitUID: string[] = docData.roomName.split('Direct');
          let directRoomName: string = '';
          for (let i = 0; i < splitUID.length; i++) {
            if (splitUID[i] !== myInfo.uid) {
              for (let j = 0; j < userList.length; j++) {
                if (splitUID[i] === userList[j].uid) {
                  directRoomName += userList[j].nickname + ' ';
                }
              }
            }
          }
          if (selectedRoom === docData.roomName) {
            setSelectedRoom(docData.roomID);
            setClickedDM(true);
            setClickedChat(false);
          }
          temp.push({
            roomID: dmId,
            roomName: directRoomName,
            Members: docData.Members,
            date: docData.date,
          });
          dmId = dmId + 1;
        }
      });
      setDmList(temp);
    });
  };

  const userListListener = () => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (query) => {
      const temp: IUserInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        // if (enterRoom.Members.includes(docData.uid)) {
        temp.push({
          nickname: docData.nickname,
          email: docData.email,
          uid: docData.uid,
          photoURL: docData.photoURL,
        });
        // }
      });
      setUserList(temp);
    });
  };

  let chatId: number = 0;

  const roomsListener = () => {
    const q = query(collection(db, 'Rooms'), orderBy('date'));
    const selectedRoom = location.pathname.split('/')[2];

    onSnapshot(q, (query) => {
      const temp: IRoomInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        if (selectedRoom === docData.roomName) {
          setSelectedRoom(docData.roomID);
          setClickedDM(true);
          setClickedChat(false);
        }
        temp.push({
          roomID: chatId,
          roomName: docData.roomName,
          Owner: docData.Owner,
          Members: docData.Members,
          date: docData.date,
        });
        chatId = chatId + 1;
      });
      // setEnterRoom(temp[0]);
      setRoomsList(temp);
    });
  };

  return (
    <>
      <HeaderPannel />
      <div style={{ display: 'flex' }}>
        <SidePannel />
        <MainPannel />
        {!clickedUser.uid ? (
          <ListPannel>
            <MemberList />
            <FollowList />
          </ListPannel>
        ) : (
          <Profile init={init} />
        )}
      </div>
    </>
  );
};

export default ChatPage;

const { ListPannel } = Style;
