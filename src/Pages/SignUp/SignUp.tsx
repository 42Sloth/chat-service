import React, { useRef } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { IFormInput } from 'Types';
import { db } from 'fBase';
import { FormButton } from 'Components';
import { style } from 'Styles/FormStyle';
import logo from 'Assets/Chatpong_logo_trans.png';

const SignUp: React.FC = () => {
  const history = useHistory();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const password = useRef<string | null>(null);
  password.current = watch('password');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const auth = getAuth();
      const info = data.email;

      await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.nickname,
          photoURL:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
        });
        await setDoc(doc(db, 'users', `${auth.currentUser.uid}`), {
          nickname: data.nickname,
          email: data.email,
          uid: auth.currentUser.uid,
          photoURL:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
        });
        await updateDoc(doc(db, 'Rooms', 'lobby'), {
          Members: arrayUnion(auth.currentUser.uid),
        });
        history.push({
          pathname: '/signup-success',
          state: info,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header>
        <Logo to="/">
          <img src={logo} alt="logo" />
        </Logo>
      </Header>

      <Body>
        <H1Text>SignUp</H1Text>
        <H2Text>
          <Strong>직장에서 사용하는 이메일 주소</Strong>로 가입하는
          것이좋습니다.
        </H2Text>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Wrap>
            <FormLabel htmlFor="email">아이디</FormLabel>
            <TextInput
              id="email"
              type="email"
              placeholder="name@work-email.com.com"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>This email field is required</p>}
          </Wrap>
          <Wrap>
            <FormLabel htmlFor="nickname">닉네임</FormLabel>
            <TextInput
              id="nickname"
              type="text"
              placeholder="닉네임"
              {...register('nickname', { required: true, maxLength: 20 })}
            />
            {errors.nickname && errors.nickname.type === 'required' && (
              <p>This name field is required</p>
            )}
            {errors.nickname && errors.nickname.type === 'maxLength' && (
              <p>Your input exceed maximum length</p>
            )}
          </Wrap>
          <Wrap>
            <FormLabel htmlFor="password">비밀번호</FormLabel>
            <TextInput
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === 'required' && (
              <p>This password field is required</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p>Password must have at least 6 characters</p>
            )}
          </Wrap>
          <Wrap>
            <FormLabel htmlFor="validatedPassword">비밀번호 확인</FormLabel>
            <TextInput
              id="validatedPassword"
              type="password"
              placeholder="비밀번호 확인"
              {...register('validatedPassword', {
                required: true,
                validate: (value) => value === password.current,
              })}
            />
            {errors.validatedPassword &&
              errors.validatedPassword.type === 'required' && (
                <p>This password confirm field is required</p>
              )}
            {errors.validatedPassword &&
              errors.validatedPassword.type === 'validate' && (
                <p>The passwords do not match</p>
              )}
          </Wrap>
          <FormButton
            color="#fff"
            marginTop="25px"
            background="#611f69"
            type="submit"
          >
            회원 가입
          </FormButton>
        </Form>
      </Body>
    </>
  );
};

export default SignUp;

const {
  Header,
  Logo,
  Body,
  H1Text,
  H2Text,
  Form,
  Wrap,
  FormLabel,
  Strong,
  TextInput,
} = style;
