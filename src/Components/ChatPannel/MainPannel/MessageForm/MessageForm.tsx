import { db } from 'fBase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { atomMyInfo } from 'Recoil/atom';
import { useLocation } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

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

  const handleSubmit = (e: React.MouseEvent<SVGElement>) => {
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
            placeholder="메세지를 입력해주세요"
            onChange={handleChange}
          />
          <div>
            <FaPaperPlane onClick={handleSubmit} />
          </div>
        </InnerBox>
      </Inner>
    </Container>
  );
};

export default MessageForm;

const { Container, Inner, InnerBox, Input } = style;
