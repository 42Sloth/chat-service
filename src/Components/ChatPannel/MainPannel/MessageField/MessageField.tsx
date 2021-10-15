import React, { useEffect, useState } from 'react';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'fBase';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IMessage, ILocationState } from 'Types';
import { atomRoomCheck } from 'Recoil/atom';

import { style } from './MessageFieldStyle';
import profile_kbs from 'Assets/profile_kbs.jpg';

const MessageField: React.FC = () => {
  //const [messages, setMessages] = useRecoilState(atomMessages);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const location = useLocation<ILocationState>();
  const [isDirect, setIsDirect] = useRecoilState(atomRoomCheck);

  const messagesListener = () => {
    // const path =
    //   location.state.from !== undefined ? location.state.from : 'lobby';
    // /chat으로가면 로비로 이동 
    const { from } = location.state || { from: 'lobby' };
    setIsDirect(false);

    if (from.length > 6) {
      if ('Direct' === from.substring(from.length - 6, from.length)) {
        setIsDirect(true);
      }
    }
    const q = query(
      collection(
        db,
        `${isDirect === false ? 'Rooms' : 'Direct'}`,
        from,
        'Messages',
      ),
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
  }, [location.state, isDirect]);

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
                {message.nickname}
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
