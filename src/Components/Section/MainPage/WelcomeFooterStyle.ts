import styled from 'styled-components';

const WelcomeContainer = styled.section`
  width: 100%;
  min-height: 370px;
  display: flex;
  align-items: center;
  background: #4a154b;
  clip-path: ellipse(75% 100% at center top);
  margin-bottom: 50px;
`;

const InnerContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 50px;
`;

const BtnContents = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
`;

const SignUpBtn = styled.div`
  width: 120px;
  padding: 20px 40px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  color: #4a154b;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const ChatBtn = styled.div`
  width: 120px;
  padding: 20px 40px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #4a154b;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

export const style = {
  WelcomeContainer,
  InnerContainer,
  Title,
  BtnContents,
  SignUpBtn,
  ChatBtn,
};
