import React from "react";
import styled from "@emotion/styled";

export default function SideBar() {
  return <Aside>SideBar</Aside>;
}

const Aside = styled.aside`
  width: ${({ theme }) => theme.sideBarMaxWidth};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.PRIMARY_LIGHT};
`;
