import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled(Link)`
  min-width: 80px;
  display: flex;
  justify-content: center;
  font-size: 1.125rem;
  text-decoration: none;
  color: #343a40;
`;

function HeaderMenu({ to, children }) {
  return <Menu to={to}>{children}</Menu>;
}

export default HeaderMenu;
