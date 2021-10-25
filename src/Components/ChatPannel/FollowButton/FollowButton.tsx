import { db } from 'fBase';
import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { atomFollowCheck } from 'Recoil/atom';
import { IUserInfo } from 'Types';

const FollowButton = (props: any) => {
  const [following, setFollowing] = useState(false);

  const handleFollowing = async (data: IUserInfo) => {
    const auth = getAuth();
    const uid = data.uid;
    console.log(uid);
    if (auth.currentUser) {
      const followRef = doc(
        db,
        'Following',
        `${auth.currentUser.uid}`,
        'FollowingUser',
        `${uid}`,
      );
      if (following) {
        await deleteDoc(followRef);
        setFollowing((prev) => !prev);
      } else {
        await setDoc(followRef, {
          isFollowing: true,
        });
        setFollowing((prev) => !prev);
      }
    }
  };

  // const addFollowingListener = () => {
  //   const followSnapshot = query(collection(db, 'Following'));
  //   onSnapshot(followSnapshot, (querySnapshot) => {
  //     const isFollow: any = [];
  //     querySnapshot.forEach((doc) => {
  //       isFollow.push(doc.data().isFollowing);
  //     });
  //     setFollowing(isFollow);
  //   });
  // };

  // useEffect(() => {
  //   addFollowingListener();
  // }, []);

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
