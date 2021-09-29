import styled from 'styled-components';

const RoomContainer = styled.div``;

const RoomTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 4px;
`;

const RoomList = styled.ul`
  list-style: none;
  padding: 10px 10px 0 20px;

  li {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
`;

export const style = {
  RoomContainer,
  RoomTitle,
  RoomList,
};
