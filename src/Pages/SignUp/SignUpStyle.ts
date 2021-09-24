import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 12px;
    color: red;
    margin: -15px 0 20px 0;
  }
`;

const CheckBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  margin: 0 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  background: #fff;
  color: #611f69;
  border: 1px solid #611f69;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const styleSignUp = {
  Wrap,
  CheckBtn,
  FormLabel,
};
