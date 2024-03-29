import React from 'react';
import { db } from 'fBase';
import { getAuth } from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { IUserInfo } from 'Types';
import { IFollowbutton } from 'Types/IFollowButton';

const FollowButton = (props: IFollowbutton) => {
  const isFollow: boolean = props.isFollow;

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
      if (isFollow) {
        await deleteDoc(followRef);
      } else {
        await setDoc(followRef, {
          nickname: data.nickname,
          email: data.email,
          uid: data.uid,
          photoURL: data.photoURL,
        });
      }
    }
  };

  return (
    <>
      {!isFollow ? (
        <button onClick={() => handleFollowing(props.data)}>팔로우</button>
      ) : (
        <button
          onClick={() => handleFollowing(props.data)}
          style={{
            background: 'transparent',
            color: '#611f66',
            border: '1px solid #611f66',
          }}
        >
          언팔로우
        </button>
      )}
    </>
  );
};

export default FollowButton;
