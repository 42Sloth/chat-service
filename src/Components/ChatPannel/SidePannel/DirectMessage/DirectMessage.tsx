import React, { useState } from 'react';
import { style } from './DirectMessageStyle';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
import user from 'Assets/MOCK_DATA';

const DirectMessage = () => {
  const renderDirectMessages = user.map((data) => (
    <li key={data.id}>
      # <img src={data.thumbnail} />
      {data.nickname}
    </li>
  ));

  const [toggle, setToggle] = useState<boolean>(true);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <DMContainer>
      <Title onClick={handleClick}>
        {toggle ? <FaCaretDown /> : <FaCaretRight />}
        Direct message
      </Title>
      {toggle ? <DMList>{renderDirectMessages}</DMList> : null}
    </DMContainer>
  );
};

export default DirectMessage;

const { DMContainer, Title, DMList } = style;
