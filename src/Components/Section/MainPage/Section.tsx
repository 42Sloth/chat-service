import React from 'react';
import { style } from 'Components/Section/MainPage/SectionStyle';
import campaign from 'Assets/img-campaign.jpg';

const Section: React.FC = () => {
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Title>Slack은 미래의 일이 이뤄지는 곳 입니다.</Title>
          <SubTitle>
            일을 완료하는 데 필요한 모든 사람과 모든 항목을 위해 한 곳에서
            작업하는 방식을 바꿔보세요
          </SubTitle>
          <GameBtn>게임하기</GameBtn>
        </Content>
        <IntroImg>
          <img src={campaign} alt="campaign" />
        </IntroImg>
      </InnerContainer>
    </Container>
  );
};

export default Section;

const {
  Container,
  InnerContainer,
  Content,
  Title,
  SubTitle,
  GameBtn,
  IntroImg,
} = style;
