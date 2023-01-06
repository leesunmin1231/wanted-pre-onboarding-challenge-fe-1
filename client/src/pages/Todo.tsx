import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useModal from '../hooks/useModal';
import TodoList from '../components/TodoList';
import { TodoFrame } from '../styles/frame';

export default function Todo() {
  const [isLogined, setIsLogined] = useState(false);
  const navigate = useNavigate();
  const { setContent, closeModal } = useModal();
  const modalButton = (name: string, url: string) => ({
    name,
    handler: () => {
      navigate(url);
      closeModal();
    },
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setContent('로그인이 필요한 페이지 입니다.\n로그인 하시겠습니까?', [
        modalButton('회원가입', '/auth/signup'),
        modalButton('로그인', '/auth/login'),
      ]);
    }
    setIsLogined(true);
  }, [setIsLogined]);
  return <TodoFrame>{isLogined ? <TodoList /> : <Loading />}</TodoFrame>;
}
