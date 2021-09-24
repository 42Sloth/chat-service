import React from 'react';
import { useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const SignInSuccess = () => {
  // const location = useLocation();
  // const info = location.state;
  // console.log(info);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log('로그인 완료');
    console.log(user);
  } else {
    console.log('로그아웃');
  }

  return (
    <>
      <h1>로그인 성공</h1>
    </>
  );
};

export default SignInSuccess;
