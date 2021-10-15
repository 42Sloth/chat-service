import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 50%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(29, 28, 29, 0.13);
`;

const Title = styled.div`
  height: 49px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  background: #fceb92;

  div {
    font-size: 20px;
  }

  h6 {
    font-size: 16px;
    font-weight: 600;
  }
`;

const MemberLists = styled.ul`
  padding: 20px;

  div {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 15px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 5px;
    vertical-align: middle;
  }

  li {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
  }

  button {
    height: 26px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border: 0;
    background: #611f66;
    color: #fff;
  }
`;

export const MlStyle = { Container, Title, MemberLists };
