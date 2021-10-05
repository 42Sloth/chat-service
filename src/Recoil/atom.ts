import { atom } from 'recoil';
import { IMessage, IRoomInfo, IUserInfo } from 'Types';

export const atomSignCheck = atom<boolean>({
  key: 'SignCheck',
  default: false,
});

export const atomMemberList = atom<IUserInfo[]>({
  key: 'MemberList',
  default: [],
});

export const atomClickedUser = atom<IUserInfo>({
  key: 'ClickedUser',
  default: {
    nickname: '',
    email: '',
    uid: '',
    photoURL: '',
  },
});

export const atomMyInfo = atom<IUserInfo>({
  key: 'MyInfo',
  default: {
    nickname: '',
    email: '',
    uid: '',
    photoURL: '',
  },
});

export const atomRoomsInfo = atom<IRoomInfo[]>({
  key: 'Rooms',
  default: [],
});

export const atomEnterRoom = atom<IRoomInfo>({
  key: 'EnterRoom',
  default: {
    roomID: 0,
    roomName: '',
    Owner: '',
    Members: [],
  },
});

export const atomMessages = atom<IMessage[]>({
  key: 'Messages',
  default: [],
});
