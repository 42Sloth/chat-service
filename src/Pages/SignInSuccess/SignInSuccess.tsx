import React from 'react';
import { getAuth } from 'firebase/auth';

const SignInSuccess = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {

  } else {

  }

  return (
    <>
      <h1>로그인 성공</h1>
    </>
  );
};

export default SignInSuccess;
