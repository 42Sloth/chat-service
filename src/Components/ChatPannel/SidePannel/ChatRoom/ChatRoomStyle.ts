import styled from 'styled-components';

const RoomContainer = styled.div``;

const RoomTitle = styled.span`
  display: flex;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
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

const RoomTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  align-items: center;
`;

const Btn = styled.div`
  width: fit-content;
  svg {
    color: indigo;
  }
`;
export const style = {
  RoomContainer,
  RoomTitle,
  RoomList,
  RoomTitleWrap,
  Btn,
};
