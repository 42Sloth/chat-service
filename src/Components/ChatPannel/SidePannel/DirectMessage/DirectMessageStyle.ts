import styled, { css } from 'styled-components';

const DMContainer = styled.div``;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 4px;
  cursor: pointer;
  width: fit-content;

  div {
    font-size: 20px;
    margin-right: 5px;
  }
`;

const Btn = styled.div`
  cursor: pointer;
  font-size: 20px;

  svg {
    color: indigo;
  }
`;

const DMList = styled.ul`
  list-style: none;
  font-size: 16px;

  img {
    width: 20px;
    margin: 0 5px;
    border-radius: 5px;
  }
`;

const DeleteBox = styled.div`
  visibility: hidden;
`;

const DM = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 15px;
  height: 28px;
  color: rgb(147, 93, 81);
  justify-content: space-between;
  ${(props: {
    selectedDM: boolean;
    clickedDM: boolean;
    clickedChat: boolean;
  }) =>
    props.selectedDM &&
    props.clickedDM &&
    !props.clickedChat &&
    css`
      font-weight: bolder;
      background-color: #ffc806;
    `}

  &:hover {
    background-color: #fff8d4;

    div {
      margin-right: 10px;
      visibility: visible;
      cursor: pointer;
      &:hover {
        border-radius: 70%;
        background-color: #ffc806;
        color: black;
      }
    }
  }
`;

export const style = {
  DMContainer,
  TitleWrap,
  Title,
  Btn,
  DMList,
  DM,
  DeleteBox,
};
