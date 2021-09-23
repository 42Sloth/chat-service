import React, { useState } from 'react';
import { styleSignIn } from 'Pages/SignIn/SignInStyle';
import { styleSignUp } from './SignUpStyle';
import { IFormInput } from 'Types';
import logo from 'Assets/Chatpong_logo_trans.png';
import { app, db } from '../../fBase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';

const SignUp: React.FC = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // const [form, setForm] = useState<ISignUpForm>({
  //   nickname: '',
  //   email: '',
  //   password: '',
  //   validatedPassword: '',
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const text = e.target.value;
  //   setForm((prevForm) => ({ ...prevForm, [e.target.name]: text }));
  // };

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      ).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      });

      const docRef = await addDoc(collection(db, 'users'), {
        nickname: data.nickname,
        email: data.email,
      });
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
          <Strong>직장에서 사용하는 이메일 주소</Strong>로 가입하는 것이
          좋습니다.
        </H2Text>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Wrap>
            <IdInput {...register('email')} />
            <IdCheckBtn color="#611f69" marginTop="0px" background="white">
              중복 확인
            </IdCheckBtn>
          </Wrap>

          <Wrap>
            <NickNameInput {...register('nickname')} />
            <NickNameCheckBtn
              color="#1264a3"
              marginTop="0px"
              background="white"
            >
              중복 확인
            </NickNameCheckBtn>
          </Wrap>

          <PwInput {...register('password')} />
          <PwCheckInput {...register('validatedPassword')} />

          <Button
            color="#fff"
            marginTop="25px"
            background="#611f69"
            type="submit"
          >
            회원 가입
          </Button>
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
  Button,
  Form,
  IdInput,
  PwInput,
  Strong,
} = styleSignIn;

const { Wrap, IdCheckBtn, PwCheckInput, NickNameInput, NickNameCheckBtn } =
  styleSignUp;
