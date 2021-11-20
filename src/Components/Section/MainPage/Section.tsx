import React from 'react';
import { style } from 'Components/Section/MainPage/SectionStyle';
import campaign from 'Assets/img-campaign.jpg';
import BrandLogo from './BrandLogo';

const Section: React.FC = () => {
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Title>ChatPong은 협업의 미래입니다.</Title>
          <SubTitle>메신저 플랫폼의 신세계를 경험해보세요.</SubTitle>
          <ChatBtn to="/chat/lobby">채팅하기</ChatBtn>
        </Content>
        <IntroImg>
          <img src={campaign} alt="campaign" />
        </IntroImg>
      </InnerContainer>
      <BrandLogo />
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
  ChatBtn,
  IntroImg,
} = style;
