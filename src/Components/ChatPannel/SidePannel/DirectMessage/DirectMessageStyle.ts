import styled from 'styled-components';

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

  li {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }

  img {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
`;

export const style = {
  DMContainer,
  Title,
  DMList,
};
