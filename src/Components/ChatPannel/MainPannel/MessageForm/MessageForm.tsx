import { db } from 'fBase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { atomMyInfo, atomRoomCheck } from 'Recoil/atom';
import { useLocation } from 'react-router-dom';
import { ILocationState } from 'Types';
import { FaPaperPlane } from 'react-icons/fa';
import { style } from './MessageFormStyle';
import moment from 'moment';
import 'moment/locale/ko';

const MessageForm: React.FC = () => {
  const [content, setContent] = useState('');
  const myInfo = useRecoilValue(atomMyInfo);
  const isDirect = useRecoilValue(atomRoomCheck);
  const location = useLocation<ILocationState>();
  const nowTime = moment().format('YYYY-MM-DD HH:mm');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const temp = content;
    const from = location.pathname.split('/')[2];

    setContent('');
    addDoc(
      collection(
        db,
        `${isDirect === false ? 'Rooms' : 'Direct'}`,
        from,
        'Messages',
      ),
      {
        content: temp,
        from: myInfo.uid,
        nickname: myInfo.nickname,
        date: nowTime,
      },
    );
  };
  return (
    <Container>
      <Inner>
        <InnerBox>
          <Input
            value={content}
            placeholder="메세지를 입력해주세요"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          ></Input>
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
