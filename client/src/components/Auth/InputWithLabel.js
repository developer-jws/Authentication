import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #f1f3f5;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  padding: 0 0.5rem 0 0.5rem;
  ::placeholder {
    color: #adb5bd;
  }
`;

function InputWithLabel({ label, ...rest }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input {...rest} />
    </Wrapper>
  );
}

export default InputWithLabel;
