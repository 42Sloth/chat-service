import { db } from 'fBase';
import { getAuth } from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { atomMyInfo } from 'Recoil/atom';
import { IUserInfo } from 'Types';

const FollowButton = (props: any) => {
  const [following, setFollowing] = useState(false);
  const myInfo = useRecoilValue(atomMyInfo);
  const data = props.data;

  const handleFollowing = async (data: IUserInfo) => {
    const auth = getAuth();
    const uid = data.uid;
    if (auth.currentUser) {
      const followRef = doc(
        db,
        'users',
        `${auth.currentUser.uid}`,
        'following',
        `${uid}`,
      );
      if (following) {
        await deleteDoc(followRef);
        setFollowing(false);
      } else {
        await setDoc(followRef, {
          nickname: data.nickname,
          email: data.email,
          uid: data.uid,
          photoURL: data.photoURL,
        });
        setFollowing(true);
      }
    }
  };

  const addFollowingListener = async () => {
    const uid = data.uid;

    const followRef = doc(db, 'users', myInfo.uid, 'following', uid);
    if (followRef) {
      const response = await getDoc(followRef);
      if (response.exists()) {
        setFollowing(true);
      }
    }
  };

  useEffect(() => {
    addFollowingListener();
  }, []);

  return (
    <>
      {!following ? (
        <button onClick={() => handleFollowing(props.data)}>팔로우</button>
      ) : (
        <button onClick={() => handleFollowing(props.data)}>언팔로우</button>
      )}
    </>
  );
};

export default FollowButton;
