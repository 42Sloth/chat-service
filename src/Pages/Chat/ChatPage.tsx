import React, { useCallback, useState, useEffect } from 'react';
import { MainPannel, SidePannel } from 'Components';
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
  atomMyInfo,
  atomRoomsInfo,
  atomUserList,
  atomSelectedRoom,
  atomClickedChat,
  atomClickedDirectMsg,
  atomDirectRoomInfo,
  atomFollowList,
} from 'Recoil/atom';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from 'fBase';
import { TextInputProps } from 'Types/TextInputProps';
import { Style } from './ChatPageStyle';
import { ILocationState, IRoomInfo, IUserInfo, IDirectRoomInfo } from 'Types';
import Spinnner from 'Components/Spinnner/Spinnner';

const ChatPage: React.FC<TextInputProps> = ({ init }) => {
  const clickedUser = useRecoilValue(atomClickedUser);
  const [myInfo, setMyInfo] = useRecoilState(atomMyInfo);
  const myInfoReset = useResetRecoilState(atomMyInfo);
  const setRoomsList = useSetRecoilState(atomRoomsInfo);
  const [userList, setUserList] = useRecoilState(atomUserList);
  const [followingList, setFollowingList] = useRecoilState(atomFollowList);
  const [loading, setLoading] = useState(true);
  const setDmList = useSetRecoilState(atomDirectRoomInfo);
  const setClickedDM = useSetRecoilState<boolean>(atomClickedDirectMsg);
  const setClickedChat = useSetRecoilState<boolean>(atomClickedChat);
  const setSelectedRoomId = useSetRecoilState<number>(atomSelectedRoom);
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
  }, []);

  useEffect(() => {
    setLoading(false);
    directMessagesRoomListener();
    followingListListener();
  }, [myInfo]);

  const followingListListener = () => {
    if (myInfo.uid !== '') {
      const q = query(collection(db, 'users', myInfo.uid, 'following'));

      onSnapshot(q, (query) => {
        const temp: IUserInfo[] = [];
        query.forEach((doc) => {
          const docData = doc.data();
          temp.push({
            nickname: docData.nickname,
            email: docData.email,
            uid: docData.uid,
            photoURL: docData.photoURL,
          });
        });
        setFollowingList(temp);
      });
    }
  };

  let dmId: number = 0;

  const directMessagesRoomListener = useCallback(() => {
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
            setSelectedRoomId(dmId);
            setClickedDM(true);
            setClickedChat(false);
          }
          temp.push({
            roomID: dmId,
            roomName: directRoomName,
            Members: docData.Members,
            date: docData.date,
          });
          dmId += 1;
        }
      });
      setDmList(temp);
    });
  }, [myInfo]);

  const userListListener = () => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (query) => {
      const temp: IUserInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        temp.push({
          nickname: docData.nickname,
          email: docData.email,
          uid: docData.uid,
          photoURL: docData.photoURL,
        });
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
          setSelectedRoomId(chatId);
          setClickedDM(false);
          setClickedChat(true);
        }
        temp.push({
          roomID: chatId,
          roomName: docData.roomName,
          Owner: docData.Owner,
          Members: docData.Members,
          date: docData.date,
        });
        chatId += 1;
      });
      setRoomsList(temp);
    });
  };

  return (
    <>
      {loading ? (
        <Spinnner />
      ) : (
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
      )}
    </>
  );
};

export default ChatPage;

const { ListPannel } = Style;
