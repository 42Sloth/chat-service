import React, { useEffect, useState } from 'react';

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from 'fBase';
import { useRecoilState } from 'recoil';
import { atomMessages } from 'Recoil/atom';
import { useLocation } from 'react-router-dom';

import { style } from './MessageFieldStyle';
import profile_kbs from 'Assets/profile_kbs.jpg';
import { IMessage } from 'Types';
import { message } from 'antd';

const MessageField: React.FC = () => {
  //const [messages, setMessages] = useRecoilState(atomMessages);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const location = useLocation();

  const messagesListener = () => {
    const q = query(
      collection(db, 'Rooms', `${location.state}`, 'Messages'),
      orderBy('date'),
    );
    onSnapshot(q, (query) => {
      const temp: IMessage[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        temp.push({
          content: docData.content,
          from: docData.from,
          date: docData.date,
        });
      });
      setMessages(temp);
    });
  };

  useEffect(() => {
    messagesListener();
  }, [location.state]);

  return (
    <Container>
      {messages
        .slice(0)
        .reverse() 
        .map((message) => (
          <Content key={message.date}>
            <Thumbnail>
              <img src={profile_kbs} alt="profile" />
            </Thumbnail>
            <InnerContainer>
              <h6>
                {message.from}
                <span>00:34</span>
              </h6>
              <p>{message.content}</p>
            </InnerContainer>
          </Content>
        ))}
    </Container>
  );
};

export default MessageField;

const { Container, Content, Thumbnail, InnerContainer } = style;
