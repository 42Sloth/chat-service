import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  height: 50px;
  z-index: 200;
  padding: 3px 0;
`;

const JoinRoomList = styled.div`
  display: flex;
  width: auto;
`;

const JoinRoom = styled.div`
  padding: 0px 20px 0px 16px;
  font-weight: 600;
`;

export const style = {
  Container,
  JoinRoomList,
  JoinRoom,
};
