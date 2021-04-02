import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  background: #dee2e6;
  border: none;
  outline: none;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    border: none;
    background: #e9ecef;
  }

  &:active {
    border: none;
  }
`;

function AuthButton({ onClick, children }) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
}

export default AuthButton;
