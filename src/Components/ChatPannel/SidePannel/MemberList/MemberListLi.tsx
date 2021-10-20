import React from 'react';

const MemberListLi = (props: any) => {
  return (
    <li onClick={props.onClick}>
      <img src={props.photoURL} alt="members" />
      {props.nickname}
    </li>
  );
};

export default MemberListLi;
