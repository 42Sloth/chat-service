import React from 'react';
import { MlStyle } from '../MemberList/MemberListStyle';
import { useRecoilValue } from 'recoil';
import { atomFollowList } from 'Recoil/atom';

const FollowList = () => {
  const followList = useRecoilValue(atomFollowList);
  console.log(followList);
  return (
    <Container>
      <Title>
        <h6>Follow List</h6>
      </Title>
      <MemberLists>
        {followList.map((data, idx) => (
          <div key={idx}>
            <li>
              <img src={data.photoURL} alt="members" />
              {data.nickname}
            </li>
            <button
              style={{
                background: 'transparent',
                color: '#611f66',
                border: '1px solid #611f66',
              }}
            >
              언팔로우
            </button>
          </div>
        ))}
      </MemberLists>
    </Container>
  );
};

export default FollowList;

const { Container, Title, MemberLists } = MlStyle;
