import React from 'react';
import { styleButton } from './FormButtonStyle';

interface IFormButton {
  color: string;
  marginTop: string;
  background: string;
  children: string;
  type: 'button' | 'submit';
}

const FormButton: React.FC<IFormButton> = (props) => {
  return (
    <Button
      color={props.color}
      marginTop={props.marginTop}
      background={props.background}
      type={props.type}
    >
      {props.children}
    </Button>
  );
};

export default FormButton;

const { Button } = styleButton;
