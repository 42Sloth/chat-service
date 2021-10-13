import styled from 'styled-components';

const Container = styled.div``;

const Inner = styled.div`
  padding: 20px;
`;

const InnerBox = styled.div`
  border: 1px solid #333;
  padding: 0;
  width: 100%;
  height: 80px;
  border-radius: 10px;

  div {
    display: flex;
    justify-content: flex-end;
    padding: 5px 15px;
    font-size: 16px;
  }
`;

const Input = styled.input`
  padding: 0;
  margin: 0 auto;
  border: 0;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  width: 97%;
  height: 65%;
`;

export const style = { Container, Inner, InnerBox, Input };
