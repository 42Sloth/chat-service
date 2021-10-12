import React, { useState } from 'react';
import { style } from './DirectMessageStyle';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';
import user from 'Assets/MOCK_DATA';

const DirectMessage = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  //selected를 나중에 url에 따라서 값이 변경되는 것으로 로직 수정하자. 
  const [selected, setSelected] = useState<number>(0);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleClick = (id: number) => {
    setSelected(id);
  };

  return (
    <DMContainer>
      <Title onClick={handleToggle}>
        {toggle ? <FaCaretDown /> : <FaCaretRight />}
        Direct message
      </Title>
      {toggle ? (
        <DMList>
          {user.map((data) => (
            <DM
              key={data.id}
              selectedDM={data.id === selected ? true : false}
              onClick={() => handleClick(data.id)}
            >
              # <img src={data.thumbnail} /> {data.nickname}
            </DM>
          ))}
        </DMList>
      ) : null}
    </DMContainer>
  );
};

export default DirectMessage;

const { DMContainer, Title, DMList, DM } = style;