import { atom } from 'recoil';
import { IMemberList } from 'Types';

export const atomSignCheck = atom<boolean>({
  key: 'SignCheck',
  default: false,
});

export const atomMemberList = atom<IMemberList[]>({
  key: 'MemberList',
  default: [],
});

export const atomClickedUser = atom<IMemberList>({
  key: "ClickedUser",
  default: {
    nickname: "",
    email: "",
  }
})