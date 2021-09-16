import React from 'react';
import { style } from './WelcomeFooterStyle';

const WelcomeFooter = () => {
  return (
    <WelcomeContainer>
      <InnerContainer>
        <Title>미래의 일이 이뤄지는 곳에 오신 것을 환영합니다.</Title>
        <BtnContents>
          <SignUpBtn>회원가입</SignUpBtn>
          <ChatBtn>채팅 시작하기</ChatBtn>
        </BtnContents>
      </InnerContainer>
    </WelcomeContainer>
  );
};

export default WelcomeFooter;

const {
  WelcomeContainer,
  InnerContainer,
  Title,
  BtnContents,
  SignUpBtn,
  ChatBtn,
} = style;
