import { IUserInfo } from 'Types';

export type IMemberListLi = {
  onClick: () => void;
  photoURL: string;
  nickname: string;
  data: IUserInfo;
};
