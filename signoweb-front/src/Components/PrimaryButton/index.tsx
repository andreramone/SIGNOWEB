import React, { ButtonHTMLAttributes } from "react";
import { Wrapper, Button } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Wrapper>
    <Button {...rest}>{children}</Button>
  </Wrapper>
);

export default PrimaryButton;