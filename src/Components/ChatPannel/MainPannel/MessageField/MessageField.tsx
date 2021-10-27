import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'fBase';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { IMessage, ILocationState } from 'Types';
import { atomRoomCheck, atomUserList } from 'Recoil/atom';

import { style } from './MessageFieldStyle';

const MessageField: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const location = useLocation<ILocationState>();
  const isDirect = useRecoilValue(atomRoomCheck);
  const userList = useRecoilValue(atomUserList);

  const messagesListener = () => {
    const from = location.pathname.split('/')[2];

    const q = query(
      collection(db, `${isDirect ? 'Direct' : 'Rooms'}`, from, 'Messages'),
      orderBy('date'),
    );
    onSnapshot(q, (query) => {
      const temp: IMessage[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        temp.push({
          content: docData.content,
          from: docData.from,
          nickname: docData.nickname,
          date: docData.date,
        });
      });
      setMessages(temp);
    });
  };

  useEffect(() => {
    messagesListener();
  }, [location.pathname, isDirect]);

  return (
    <Container>
      {messages
        .slice(0)
        .reverse()
        .map((message, idx) => {
          const photoURL = userList.find(
            (user) => user.uid === message.from,
          )?.photoURL;
          return (
            <Content key={idx}>
              <Thumbnail>
                <img src={photoURL ? photoURL : ''} alt="profile" />
              </Thumbnail>
              <InnerContainer>
                <h6>
                  {message.nickname}
                  <span>00:34</span>
                </h6>
                <p>{message.content}</p>
              </InnerContainer>
            </Content>
          );
        })}
    </Container>
  );
};

export default MessageField;

const { Container, Content, Thumbnail, InnerContainer } = style;
