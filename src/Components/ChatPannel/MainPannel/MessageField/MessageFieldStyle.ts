import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 650px;
  padding: 20px;
  overflow-y: auto;
`;
const Content = styled.div`
  display: flex;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Thumbnail = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 4px;
  }
`;

const InnerContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;

  h6 {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 500;

    span {
      font-size: 12px;
      color: gray;
      margin-left: 5px;
      font-weight: 400;
    }
  }

  p {
    font-size: 15px;
    color: #464646;
  }
`;

export const style = { Container, Content, Thumbnail, InnerContainer };
