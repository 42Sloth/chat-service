import React from 'react';
import { style } from './DirectMessageStyle';
import { FaCaretRight } from 'react-icons/fa';
import user from 'Assets/MOCK_DATA';

const DirectMessage = () => {
  const renderDirectMessages = user.map((data) => (
    <li key={data.id}>
      # <img src={data.thumbnail} />
      {data.nickname}
    </li>
  ));

  return (
    <DMContainer>
      <Title>
        <FaCaretRight />
        Direct message
      </Title>
      <DMList>{renderDirectMessages}</DMList>
    </DMContainer>
  );
};

export default DirectMessage;

const { DMContainer, Title, DMList } = style;
