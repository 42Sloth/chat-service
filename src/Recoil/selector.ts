import { selector } from 'recoil';
import { IUserInfo } from 'Types';
import { atomEnterRoom, atomUserList } from './atom';

export const selectorMemberList = selector<IUserInfo[]>({
  key: 'SelectorMemberList',
  get: ({ get }) => {
    const enterRoom = get(atomEnterRoom);
    const userList = get(atomUserList);
    const memberList: IUserInfo[] = [];
    enterRoom.Members.forEach((member) => {
      const temp = userList.find((user) => member === user.uid);
      temp && memberList.push(temp);
    });
    return memberList;
  },
});
