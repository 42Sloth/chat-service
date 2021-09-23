import styled from 'styled-components';
import { styleSignIn } from 'Pages/SignIn/SignInStyle';

const { Button, Input } = styleSignIn;

const Wrap = styled.div`
  display: flex;
`;

const IdCheckBtn = styled(Button)`
  width: 150px;
  margin-left: 10px;
  font-size: 15px;
`;

const PwCheckInput = styled(Input).attrs({
  type: 'password',
  name: 'validatedPassword',
  placeholder: '비밀번호 확인',
  autoComplete: 'off',
})``;

const NickNameInput = styled(Input).attrs({
  type: 'text',
  name: 'nickname',
  placeholder: '닉네임',
  autoComplete: 'off',
})``;

const NickNameCheckBtn = styled(Button)`
  width: 150px;
  margin-left: 10px;
  font-size: 15px;
`;

export const styleSignUp = {
  Wrap,
  IdCheckBtn,
  PwCheckInput,
  NickNameInput,
  NickNameCheckBtn,
};
