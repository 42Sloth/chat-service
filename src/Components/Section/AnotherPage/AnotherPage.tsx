import React, { useState } from 'react';
import { IWorkSpaceItem } from 'Types';
import { style } from './AnotherPageStyle';
import WorkSpaceList from './WorkSpaceList/WorkSpaceList';

const AnotherPage: React.FC = () => {
  const [userId, setUserId] = useState('yonghun1120@gmail.com');
  const [workSpaceList, setworkSpaceList] = useState<IWorkSpaceItem[]>([
    {
      name: 'wecode_wanted_preonboarding',
      url: '/wecode_wanted_preonboarding',
      memberNum: 45,
      img: 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0001-88.png',
    },
    {
      name: '42born2code',
      url: '/42born2code',
      memberNum: 123,
      img: 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0001-88.png',
    },
  ]);
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Welcome>
            <Title>다시 오신 것을 환영합니다.</Title>
          </Welcome>
          <WorkSpace>
            <WorkSpaceTitle>{userId}의 워크스페이스</WorkSpaceTitle>
            {/* <WorkSpaceList workSpaceList={workSpaceList} /> */}
          </WorkSpace>
        </Content>
      </InnerContainer>
    </Container>
  );
};

export default AnotherPage;

const {
  Container,
  InnerContainer,
  Content,
  Welcome,
  Title,
  WorkSpace,
  WorkSpaceTitle,
} = style;
