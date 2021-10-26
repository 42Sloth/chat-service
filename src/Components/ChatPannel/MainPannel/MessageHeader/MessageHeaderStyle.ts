import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  height: 49px;
  z-index: 200;
  padding: 0 20px;
`;

const JoinRoom = styled.div`
  font-weight: 600;
`;

const ExitRoom = styled.button`
  border: none;
  background-color: transparent;

  &:hover {
    font-weight: 600;
  }
`;

export const style = {
  Container,
  JoinRoom,
  ExitRoom,
};
