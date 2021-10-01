import { atom } from 'recoil';
import { IUserInfo } from 'Types';

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
  key: 'MyAtom',
  default: {
    nickname: '',
    email: '',
    uid: '',
    photoURL: '',
  },
});
