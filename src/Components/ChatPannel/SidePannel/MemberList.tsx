import React, { useState, useEffect } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import {
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from 'fBase';

import { style } from './MemberListStyle';

const MemberList = () => {
  const [memberList, setMemberList] = useState<any[]>([]);

  const memberListListener = () => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (doc) => {
      const temp: any[] = [];
      doc.forEach((doc) => {
        temp.push(doc.data());
      });
      setMemberList(temp);
    });
  };

  useEffect(() => {
    memberListListener();
  }, []);

  return (
    <Container>
      <Title>
        <FaCaretRight />
        <h6>All Member</h6>
      </Title>
      <MemberLists>
        {memberList.map((data, idx) => (
          <li key={idx}>
            <img
              src="https://avatars.githubusercontent.com/u/66353903?v=4"
              alt="members"
            />
            {data.nickname}
          </li>
        ))}
      </MemberLists>
    </Container>
  );
};

export default MemberList;

const { Container, Title, MemberLists } = style;
