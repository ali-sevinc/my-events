import { ReactNode } from "react";

import styled from "styled-components";

const Container = styled.button`
  background-color: var(--color-gray-200);
  border: none;
  color: var(--color-indigo-800);
  padding: var(--size-xs) var(--size-2xl);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  z-index: 1;

  &::before {
    content: "";
    background-color: var(--color-indigo-500);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -100%;
    transition: all 0.3s;
    z-index: -1;
  }
  &:hover {
    color: var(--color-gray-200);
    background-color: transparent;
    z-index: 10;
  }
  &:hover::before {
    transform: translateX(100%);
  }
`;

interface PropsType {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

function Button({ children, onClick, disabled }: PropsType) {
  if (onClick)
    return (
      <Container disabled={disabled} onClick={onClick}>
        {children}
      </Container>
    );
  return <Container disabled={disabled}>{children}</Container>;
}

export default Button;
