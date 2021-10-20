import React from 'react';

const FollowButton = (props: any) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

export default FollowButton;
