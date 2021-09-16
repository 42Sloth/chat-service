import styled from 'styled-components';

const Container = styled.section`
  padding-top: 120px;
  height: 100%;
  background-color: #f4ede3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 1230px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;

  &:last-child {
    text-align: right;
    margin-right: 0;
    margin-left: 100px;
  }
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
  line-height: 1.25;
  margin-bottom: 50px;
`;

const ChatBtn = styled.div`
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
    transition: all ease-in-out 0.5s;
  }
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
  margin-left: 250px;

  &:hover {
    background-color: #4e1954;
    transition: all ease-in-out 0.5s;
  }
`;

const IntroImg = styled.div`
  width: 100%;

  img {
    width: 700px;
  }
`;

export const style = {
  Container,
  InnerContainer,
  Content,
  Title,
  SubTitle,
  ChatBtn,
  GameBtn,
  IntroImg,
};
