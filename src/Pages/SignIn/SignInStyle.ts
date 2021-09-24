import styled, { css } from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const Header = styled.header`
  width: 100%;
  text-align: -webkit-center;
`;

const Logo = styled(Link)`
  text-align: center;
  width: fit-content;
`;

const ToSignUp = styled(Logo)`
  color: #1264a3;
  margin-top: 10px;
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
  margin-left: 20px;

  &:hover {
    box-shadow: 1px 1px 3px #ddd;
  }
`;

const Body = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const H1Text = styled.h1`
  font-weight: 700;
  font-size: 40px;
  line-height: 46px;
  max-width: 700px;
  text-align: center;
  letter-spacing: -0.75px;
  margin-bottom: 20px;
`;

const H2Text = styled.div`
  font-size: 17px;
  line-height: 27px;
  margin-bottom: 20px;
  color: #454245;
  max-width: 700px;
  text-align: center;
`;

const Form = styled.form`
  width: 400px;
`;

const Button = styled.button`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  height: 44px;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${(props: { color: string; marginTop: string; background: string }) => css`
    color: ${props.color};
    background-color: ${props.background};
    margin-top: ${props.marginTop};
    border: 2px solid ${props.color};
  `}
`;

const Horizontal = styled.div`
  margin-bottom: 24px;
  margin-top: 24px;
  align-items: center;
  display: flex;
`;

const Hr = styled.hr`
  flex-grow: 1;
  margin: 0;
  border: none;
  border-top: 1px solid #ddd;
  clear: both;
`;

const Input = styled.input`
  height: 44px;
  line-height: 1.33333333;
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(29, 28, 29, 0.3);
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const TextInput = styled.input`
  width: 94%;
  height: 40px;
  margin-bottom: 20px;
  padding: 0 0 0 20px;
  outline: none;
  border: 1px solid rgba(29, 28, 29, 0.3);
`;

const SignUp = styled.div`
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
`;

const Strong = styled.span`
  font-weight: 800;
`;

const Or = styled.div`
  padding: 0 20px;
`;

export const styleSignIn = {
  Header,
  Logo,
  Body,
  H1Text,
  H2Text,
  Button,
  Form,
  Horizontal,
  Hr,
  Input,
  SignUp,
  Strong,
  Or,
  ToSignUp,
  TextInput,
};
