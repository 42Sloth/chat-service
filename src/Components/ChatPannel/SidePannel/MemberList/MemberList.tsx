import React, { useEffect } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'fBase';

import { MlStyle } from './MemberListStyle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { atomMemberList, atomClickedUser } from 'Recoil/atom';
import { IMemberList } from 'Types';

const MemberList = () => {
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const setClickedUser = useSetRecoilState(atomClickedUser);

  const memberListListener = () => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (query) => {
      const temp: IMemberList[] = [];
      query.forEach((doc) =>
        temp.push({
          nickname: doc.data().nickname,
          email: doc.data().email,
        }),
      );
      setMemberList(temp);
    });
  };

  const handleClickedUser = (data: IMemberList) => {
    setClickedUser(data);
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
          <li
            key={idx}
            onClick={() => {
              handleClickedUser(data);
            }}
          >
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

const { Container, Title, MemberLists } = MlStyle;
