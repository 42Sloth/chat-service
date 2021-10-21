import React, { useEffect } from 'react';
import { FaCaretRight } from 'react-icons/fa';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'fBase';
import { MlStyle } from './MemberListStyle';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { atomMemberList, atomClickedUser, atomEnterRoom } from 'Recoil/atom';
import { IUserInfo } from 'Types';
import { selectorMemberList } from 'Recoil/selector';

const MemberList = () => {
  // const [memberList, setMemberList] = useRecoilState(atomMemberList);
  const setClickedUser = useSetRecoilState(atomClickedUser);
  // const enterRoom = useRecoilValue(atomEnterRoom);
  const memberList = useRecoilValue(selectorMemberList);

  // const memberListListener = () => {
  //   const q = query(collection(db, 'users'));
  //   onSnapshot(q, (query) => {
  //     const temp: IUserInfo[] = [];
  //     query.forEach((doc) => {
  //       const docData = doc.data();
  //       // if (enterRoom.Members.includes(docData.uid)) {
  //       temp.push({
  //         nickname: docData.nickname,
  //         email: docData.email,
  //         uid: docData.uid,
  //         photoURL: docData.photoURL,
  //       });
  //       // }
  //     });
  //     setMemberList(temp);
  //   });
  // };

  const handleClickedUser = (data: IUserInfo) => {
    setClickedUser(data);
  };

  // useEffect(() => {
  //   memberListListener();
  // }, [enterRoom]);

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
            <button>팔로우</button>
          </div>
        ))}
      </MemberLists>
    </Container>
  );
};

export default MemberList;

const { Container, Title, MemberLists } = MlStyle;
