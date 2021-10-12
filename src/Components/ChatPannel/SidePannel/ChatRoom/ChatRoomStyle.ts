import styled from 'styled-components';

const RoomContainer = styled.div`
  margin-bottom: 30px;
`;

const RoomTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  width: fit-content;

  div {
    font-size: 20px;
    margin-right: 5px;
  }
`;

const RoomTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  align-items: center;
`;

const Btn = styled.div`
  cursor: pointer;
  font-size: 20px;

  svg {
    color: indigo;
  }
`;

const RoomList = styled.ul`
  list-style: none;
  padding: 0 10px 0 30px;
`;

const Room = styled.li`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    margin-left: 5px;
  }

  &:active {
    font-weight: bold;
  }
`;
export const style = {
  RoomContainer,
  RoomTitle,
  RoomList,
  RoomTitleWrap,
  Btn,
  Room,
};
