import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  min-width: 60px;
  font-size: 1.5rem;
  margin: 0 1rem 0 1rem;
  text-decoration: none;
  letter-spacing: 2px;
  color: #343a40;
`;

function HeaderLogo({ to, children }) {
  return <Logo to={to}>{children}</Logo>;
}

export default HeaderLogo;
