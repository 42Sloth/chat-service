import React from 'react';
import { FaStar } from 'react-icons/fa';
import { ILocationState, IUserInfo } from 'Types';
import { useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { atomRoomsInfo } from 'Recoil/atom';
import { IMemberListLi } from 'Types/IMemberListLi';

const MemberListLi = (props: IMemberListLi) => {
  const location = useLocation<ILocationState>();
  const from = location.pathname.split('/')[2];
  const roomsList = useRecoilValue(atomRoomsInfo);
  const roomInfo = roomsList.find((room) => room.roomName === from);
  return (
    <li onClick={props.onClick}>
      <img src={props.photoURL} alt="members" />
      {props.nickname}
      {roomInfo && roomInfo.Owner === props.data.uid && (
        <FaStar style={{ color: '#ff4545' }} />
      )}
    </li>
  );
};

export default MemberListLi;
