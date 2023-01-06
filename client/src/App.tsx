import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";
import styled from "@emotion/styled";
import globalStyle from "./styles/global";
import Main from "./pages/Main";
import AppTheme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <AppStyle>
          <Main />
        </AppStyle>
      </RecoilRoot>
    </ThemeProvider>
  );
}

const AppStyle = styled.div`
  height: 100%;
`;

export default App;
