import { atom } from 'recoil';
import { IMessage, IRoomInfo, IUserInfo, IDirectRoomInfo } from 'Types';

export const atomSignCheck = atom<boolean>({
  key: 'SignCheck',
  default: false,
});

export const atomUserList = atom<IUserInfo[]>({
  key: 'UserList',
  default: [],
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

export const atomRoomCheck = atom<boolean>({
  key: 'RoomCheck',
  default: false,
});

export const atomClickedDirectMsg = atom<boolean>({
  key: 'ClickedDirectMsg',
  default: false,
});

export const atomClickedChat = atom<boolean>({
  key: 'ClickedChat',
  default: false,
});
export const atomFollowCheck = atom<boolean>({
  key: 'FollowCheck',
  default: false,
});
