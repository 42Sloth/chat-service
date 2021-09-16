import styled from 'styled-components';

const Container = styled.div`
  padding-top: 128px;
  height: 100%;
  background-color: #f6efe9;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 1024px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 44px;
  font-weight: 700;
  line-height: 1.25;
  margin: 40px 0 20px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const GameBtn = styled.div`
  width: 160px;
  padding: 20px 0;
  outline: none;
  border: none;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  background-color: #611f69;
  cursor: pointer;

  &:hover {
    background-color: #4e1954;
  }
`;

const IntroImg = styled.div`
  width: 100%;

  img {
    width: 600px;
  }
`;

export const style = {
  Container,
  InnerContainer,
  Content,
  Title,
  SubTitle,
  GameBtn,
  IntroImg,
};
