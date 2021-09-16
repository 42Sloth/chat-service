import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  align-items: center;
`;

const Logo = styled.div`
  text-align: center;
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
  font-size: 48px;
  line-height: 46px;
  max-width: 700px;
  text-align: center;
  letter-spacing: -0.75px;
  margin-bottom: 20px;
`;

const H2Text = styled.div`
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 32px;
  color: #454245;
  max-width: 700px;
  text-align: center;
`;

const Form = styled.div`
  width: 400px;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${(props: {
    color: string;
    marginTop: string;
    background: string;
  }) => props.background};
  border: 2px solid
    ${(props: { color: string; marginTop: string; background: string }) =>
      props.color};
  color: ${(props: { color: string; marginTop: string; background: string }) =>
    props.color};
  font-size: 18px;
  font-weight: 700;
  height: 44px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: NotoSansKR, Slack-Lato, appleLogo, sans-serif;
  margin-top: ${(props: {
    color: string;
    marginTop: string;
    background: string;
  }) => props.marginTop};
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
  font-size: 18px;
  line-height: 1.33333333;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid rgba(29, 28, 29, 0.3);
  margin: 0 0 20px;
  padding-left: 20px;
  box-sizing: border-box;
`;

const IdInput = styled(Input).attrs({
  type: 'text',
  placeholder: 'name@work-email.com',
  autoComplete: 'off',
})``;

const PwInput = styled(Input).attrs({
  type: 'text',
  placeholder: 'password',
  autoComplete: 'off',
})``;

const SignUp = styled.div`
  font-size: 13px;
  margin-top: 20px;
  text-align: center;
`;

export const style = {
  Header,
  Logo,
  Body,
  H1Text,
  H2Text,
  Button,
  Form,
  Horizontal,
  Hr,
  IdInput,
  PwInput,
  SignUp,
};
