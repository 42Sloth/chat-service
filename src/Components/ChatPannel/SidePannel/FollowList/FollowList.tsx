import React from 'react';
import { FaCaretRight } from 'react-icons/fa';
import { MlStyle } from '../MemberList/MemberListStyle';
import { useRecoilState } from 'recoil';
import { atomMemberList } from 'Recoil/atom';

const FollowList = () => {
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  return (
    <Container>
      <Title>
        <div>
          <FaCaretRight />
        </div>
        <h6>Follow List</h6>
      </Title>
      <MemberLists>
        {memberList.map((data, idx) => (
          <li key={idx}>
            <img src={data.photoURL} alt="members" />
            {data.nickname}
          </li>
        ))}
      </MemberLists>
    </Container>
  );
};

export default FollowList;

const { Container, Title, MemberLists } = MlStyle;
