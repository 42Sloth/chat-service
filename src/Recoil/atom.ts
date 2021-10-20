import { atom } from 'recoil';
import { IMessage, IRoomInfo, IUserInfo, IDirectRoomInfo } from 'Types';

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
    following: false,
  },
});

export const atomMyInfo = atom<IUserInfo>({
  key: 'MyInfo',
  default: {
    nickname: '',
    email: '',
    uid: '',
    photoURL: '',
    following: false,
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
    date: '',
  },
});

export const atomMessages = atom<IMessage[]>({
  key: 'Messages',
  default: [],
});

export const atomDirectRoomInfo = atom<IDirectRoomInfo[]>({
  key: 'DirectRooms',
  default: [],
});

export const atomRoomCheck = atom<Boolean>({
  key: 'RoomCheck',
  default: false,
});
