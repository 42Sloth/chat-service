import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  height: 44px;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${(props: { color: string; marginTop: string; background: string }) => css`
    color: ${props.color};
    background-color: ${props.background};
    margin-top: ${props.marginTop};
    border: 2px solid ${props.color};
  `}
`;

export const styleButton = {
  Button,
};
