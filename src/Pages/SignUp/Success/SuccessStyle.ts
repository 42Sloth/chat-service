import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 100px auto;
`;

const Logo = styled.div``;

const SuccessTitle = styled.h1`
  font-size: 60px;
  font-weight: 300;
  margin-bottom: 40px;
`;

const SuccessDesc = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;

  span {
    color: #611f69;
    font-weight: 600;
  }
`;

const LoginBtn = styled(Link)`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  outline: none;
  border: none;
  background: #611f69;
  color: #fff;
  font-size: 20px;
  text-decoration: none;
`;

export const style = {
  Container,
  Logo,
  SuccessTitle,
  SuccessDesc,
  LoginBtn,
};
