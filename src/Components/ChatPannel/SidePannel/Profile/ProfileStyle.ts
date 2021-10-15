import styled from 'styled-components';
import { MlStyle } from 'Components/ChatPannel/SidePannel/MemberList/MemberListStyle';

const { Container, Title } = MlStyle;

const ProfileTitle = styled(Title)`
  padding: 0 20px;
  justify-content: space-between;
  div {
    cursor: pointer;
  }
`;

const User = styled.div`
  padding: 20px;

  img {
    width: 260px;
    height: 260px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  text-align: center;

  div {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  input {
    width: 200px;
    height: 30px;
    margin-right: 5px;
  }

  button {
    width: 50px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background: #611f66;
    color: #fff;
    transition: 0.5s;

    &:hover {
      font-weight: 600;
    }
  }
`;

const UserName = styled.h6`
  font-weight: 700;
  margin-bottom: 10px;
`;

const UserEmail = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #4d4de3;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 10px 20px;
  margin-bottom: 100px;
`;

const Btn = styled.div`
  text-align: -webkit-center;

  span {
    font-size: 12px;
    color: gray;
  }
`;

const BtnIcon = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #d7d7d7;
  margin-bottom: 5px;
  border: none;
`;

const LogoutBtn = styled.button`
  width: 200px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #611f66;
  background: transparent;
  color: #611f66;
  transition: 0.5s;

  &:hover {
    background: #611f66;
    color: #fff;
    transition: 0.5s;
  }
`;

export const style = {
  User,
  UserInfo,
  UserName,
  UserEmail,
  BtnGroup,
  Btn,
  BtnIcon,
  ProfileTitle,
  LogoutBtn,
};
