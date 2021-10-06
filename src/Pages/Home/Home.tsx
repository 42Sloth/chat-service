import React, { useEffect } from 'react';

import { Navbar, Section, WelcomeContainer } from 'Components';
import Footer from 'Components/Footer/Footer';
import { useSetRecoilState } from 'recoil';
import { atomMyInfo } from 'Recoil/atom';
import { getAuth } from '@firebase/auth';
import { query } from '@firebase/firestore';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from 'fBase';

const Home = () => {
  const setMyInfo = useSetRecoilState(atomMyInfo);

  const getMyInfo = async () => {
    const auth = getAuth();
    if (auth.currentUser) {
      const q = query(
        collection(db, 'users'),
        where('uid', '==', auth.currentUser.uid),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        console.log(docData);
        setMyInfo({
          nickname: docData.nickname,
          email: docData.email,
          uid: docData.uid,
          photoURL: docData.photoURL,
        });
      });
    }
  };
  useEffect(() => {
    getMyInfo();
  }, []);
  return (
    <>
      <Navbar />
      <Section />
      <WelcomeContainer />
      <Footer />
    </>
  );
};

export default Home;
