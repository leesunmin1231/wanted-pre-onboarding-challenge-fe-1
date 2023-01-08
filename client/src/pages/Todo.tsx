import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Loading from '../components/Loading';
import TodoList from '../components/TodoList';
import { TodoFrame } from '../styles/frame';
import { MiddleButton } from '../styles/common';
import useTokenError from '../hooks/useTokenError';

export default function Todo() {
  const [isLogined, setIsLogined] = useState(false);
  const navigate = useNavigate();
  const { tokenError } = useTokenError();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      tokenError();
    }
    setIsLogined(true);
  }, [setIsLogined]);
  const logoutAction = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };
  return (
    <TodoFrame>
      <TopBar>
        <Title>LOGO</Title>
        <MiddleButton onClick={logoutAction}>로그아웃</MiddleButton>
      </TopBar>
      {isLogined ? <TodoList /> : <Loading />}
    </TodoFrame>
  );
}

const Title = styled.div`
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: 30px;
  font-weight: 500;
`;

const TopBar = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 5px 1px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 50px;
  padding-right: 20px;
`;
