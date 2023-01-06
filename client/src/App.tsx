import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';
import globalStyle from './styles/global';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AppTheme from './styles/theme';
import Modal from './components/Modal';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <RecoilRoot>
        <Global styles={globalStyle} />
        <AppStyle>
          <Router>
            <Routes>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/" element={<Main />} />
            </Routes>
          </Router>
        </AppStyle>
        <Modal />
      </RecoilRoot>
    </ThemeProvider>
  );
}

const AppStyle = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

export default App;
