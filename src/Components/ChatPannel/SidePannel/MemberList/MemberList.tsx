import React, { useEffect, useState } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from 'fBase';
import { MlStyle } from './MemberListStyle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { atomMemberList, atomClickedUser, atomMyInfo } from 'Recoil/atom';
import { IUserInfo } from 'Types';
import FollowButton from 'Components/ChatPannel/FollowButton/FollowButton';

const MemberList = () => {
  const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const setClickedUser = useSetRecoilState(atomClickedUser);
  const [following, setFollowing] = useState(false);

  const memberListListener = () => {
    const q = query(collection(db, 'users'));
    onSnapshot(q, (query) => {
      const temp: IUserInfo[] = [];
      query.forEach((doc) => {
        const docData = doc.data();
        temp.push({
          nickname: docData.nickname,
          email: docData.email,
          uid: docData.uid,
          photoURL: docData.photoURL,
          following: false,
        });
      });
      setMemberList(temp);
    });
  };

  const handleClickedUser = (data: IUserInfo) => {
    setClickedUser(data);
  };

  useEffect(() => {
    memberListListener();
  }, []);

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

  return (
    <Container>
      <Title>
        <div>
          <FaCaretRight />
        </div>
        <h6>All Member</h6>
      </Title>
      <MemberLists>
        {memberList.map((data, idx) => (
          <div key={idx}>
            <li
              onClick={() => {
                handleClickedUser(data);
              }}
            >
              <img src={data.photoURL} alt="members" />
              {data.nickname}
            </li>
            {!following ? (
              <FollowButton
                text="Follow"
                onClick={() => handleFollowing(data)}
              />
            ) : (
              <FollowButton
                text="Unfollow"
                onClick={() => handleFollowing(data)}
              />
            )}
          </div>
        ))}
      </MemberLists>
    </Container>
  );
};

export default MemberList;

const { Container, Title, MemberLists } = MlStyle;
