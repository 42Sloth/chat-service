import styled, { css } from 'styled-components';

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

const CreateBtn = styled.div`
  display: flex;
  justify-content: space-space-between;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 10px;

  input {
    height: 25px;
    margin-right: 10px;
  }

  button {
    height: 30px;
    padding: 8px 15px 8px;
    outline: none;
    background: #611f66;
    border: none;
    color: #fff;
  }
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
  height: 25px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;

  p {
    margin-left: 5px;
    color: #333;
  }

  ${(props: {
    selectedDM: boolean;
    clickedDM: boolean;
    clickedChat: boolean;
  }) =>
    props.selectedDM &&
    !props.clickedDM &&
    props.clickedChat &&
    css`
      font-weight: bold;
    `}
`;

export const style = {
  RoomContainer,
  RoomTitle,
  RoomList,
  RoomTitleWrap,
  CreateBtn,
  Btn,
  Room,
};
