import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  height: 49px;
  z-index: 200;
`;

const JoinRoomList = styled.div`
  display: flex;
  width: auto;
`;

const JoinRoom = styled.button`
  padding: 0px 20px 0px 16px;
  font-weight: 600;
  border: none;
  background: transparent;
`;

export const style = {
  Container,
  JoinRoomList,
  JoinRoom,
};
