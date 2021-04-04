import React from "react";
import styled from "styled-components";

const SpacerBlock = styled.div`
  flex-grow: 1;
`;

function Spacer() {
  return <SpacerBlock />;
}

export default Spacer;
