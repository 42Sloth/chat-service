import React, { useState } from 'react';
import { style } from './DirectMessageStyle';
import {
  FaCaretRight,
  FaCaretDown,
  FaHashtag,
  FaPlusSquare,
} from 'react-icons/fa';
import user from 'Assets/MOCK_DATA';

const DirectMessage = () => {
  const renderDirectMessages = user.map((data) => (
    <li key={data.id}>
      <FaHashtag />
      <img src={data.thumbnail} />
      {data.nickname}
    </li>
  ));

  const [toggle, setToggle] = useState<boolean>(true);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <DMContainer>
      <TitleWrap>
        <Title onClick={handleClick}>
          {toggle ? (
            <div>
              <FaCaretDown />
            </div>
          ) : (
            <div>
              <FaCaretRight />
            </div>
          )}
          Direct message
        </Title>
        <Btn>
          <FaPlusSquare />
        </Btn>
      </TitleWrap>
      {toggle ? <DMList>{renderDirectMessages}</DMList> : null}
    </DMContainer>
  );
};

export default DirectMessage;

const { DMContainer, TitleWrap, Title, DMList, Btn } = style;
