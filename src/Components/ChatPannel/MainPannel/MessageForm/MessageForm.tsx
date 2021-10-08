import { db } from 'fBase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { atomMyInfo } from 'Recoil/atom';
import { useLocation } from 'react-router-dom';
import { getJSDocDeprecatedTag } from 'typescript';

import { style } from './MessageFormStyle';

const MessageForm: React.FC = () => {
  const [content, setContent] = useState('');
  const myInfo = useRecoilValue(atomMyInfo);
  const location = useLocation();

  const getDate = () => {
    const date = new Date();
    return date.toISOString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const temp = content;
    setContent('');
    addDoc(collection(db, 'Rooms', `${location.state}`, 'Messages'), {
      content: temp,
      from: myInfo.uid,
      date: getDate(),
    });
  };
  return (
    <Container>
      <Inner>
        <InnerBox>
          <Input
            value={content}
            placeholder="입력해주세요"
            onChange={handleChange}
          ></Input>
          <button onClick={handleSubmit}>전송</button>
        </InnerBox>
      </Inner>
    </Container>
  );
};

export default MessageForm;

const { Container, Inner, InnerBox, Input } = style;
