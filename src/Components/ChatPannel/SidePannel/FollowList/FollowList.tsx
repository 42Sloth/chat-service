import React from 'react';
import { MlStyle } from '../MemberList/MemberListStyle';
import { useRecoilValue } from 'recoil';
import { atomFollowList } from 'Recoil/atom';
import FollowButton from '../FollowButton/FollowButton';

const FollowList = () => {
  const followList = useRecoilValue(atomFollowList);

  return (
    <Container>
      <Title>👉🏻 Follow Members</Title>
      <MemberLists>
        {followList.map((data, idx) => (
          <div key={idx}>
            <li>
              <img src={data.photoURL} alt="members" />
              {data.nickname}
            </li>
            <FollowButton isFollow={true} data={data} />
          </div>
        ))}
      </MemberLists>
    </Container>
  );
};

export default FollowList;

const { Container, Title, MemberLists } = MlStyle;
