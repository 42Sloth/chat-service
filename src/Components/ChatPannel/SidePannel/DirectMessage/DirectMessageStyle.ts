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
  padding: 0 10px 0 30px;

  img {
    width: 20px;
    margin: 0 5px;
    border-radius: 5px;
  }
`;

const DM = styled.li`
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${(props: { selectedDM: boolean }) =>
    props.selectedDM &&
    css`
      font-weight: bolder;
    `}
`;

export const style = {
  DMContainer,
  TitleWrap,
  Title,
  Btn,
  DMList,
  DM,
};
