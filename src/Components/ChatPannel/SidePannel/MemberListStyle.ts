import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: 49px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-left: 1px solid rgba(29, 28, 29, 0.13);
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  background: #fceb92;

  h6 {
    font-size: 16px;
    font-weight: 600;
  }
`;

const MemberLists = styled.ul`
  padding: 20px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 5px;
    vertical-align: middle;
  }
  li {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
`;

export const style = { Container, Title, MemberLists };
