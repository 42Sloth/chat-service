import styled, { css } from 'styled-components';

const DMContainer = styled.div``;

const Title = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 4px;
  cursor: pointer;
  width: fit-content;
`;

const DMList = styled.ul`
  list-style: none;
  padding: 10px 10px 0 20px;

  img {
    width: 20px;
    height: 20px;
    margin: 0 5px;
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
  Title,
  DMList,
  DM,
};
