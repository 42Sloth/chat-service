import React, { useEffect } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'fBase';
import { MlStyle } from './MemberListStyle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { atomMemberList, atomClickedUser } from 'Recoil/atom';
import { IUserInfo } from 'Types';

const MemberList = () => {
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const setClickedUser = useSetRecoilState(atomClickedUser);

  const memberListListener = () => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (query) => {
      const temp: IUserInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        temp.push({
          nickname: docData.nickname,
          email: docData.email,
          uid: docData.uid,
          photoURL: docData.photoURL,
        });
      });
      setMemberList(temp);
    });
  };

  const handleClickedUser = (data: IUserInfo) => {
    setClickedUser(data);
  };

  useEffect(() => {
    memberListListener();
  }, []);

  return (
    <Container>
      <Title>
        <div>
          <FaCaretRight />
        </div>
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
            <img src={data.photoURL} alt="members" />
            {data.nickname}
          </li>
        ))}
      </MemberLists>
    </Container>
  );
};

export default MemberList;

const { Container, Title, MemberLists } = MlStyle;
