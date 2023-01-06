import React, { KeyboardEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { todoList } from '../../../atom';
import { getListKey } from '../../../util/getListKey';

export default function TodoInputBox() {
  const setCurrentTodoList = useSetRecoilState(todoList);
  const [newTodo, setNewTodo] = useState('');

  const createNewTodo = () => {
    setCurrentTodoList((prevState) =>
      prevState.concat({ editing: false, done: false, content: newTodo, key: getListKey() })
    );
    setNewTodo('');
  };

  const handleTodoSubmit = (e: KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      createNewTodo();
    }
  };
  return (
    <InputBox
      type="text"
      placeholder="무엇을 해야하나요?"
      onChange={(e) => setNewTodo(e.target.value)}
      onKeyDown={handleTodoSubmit}
      value={newTodo}
    />
  );
}

const InputBox = styled.input`
  width: 100%;
  height: 60px;
  border: 0px;
  font-size: 30px;
  padding: 0px 15px;
  &:focus {
    outline-style: none;
  }
  &::placeholder {
    user-select: none;
    color: ${({ theme }) => theme.colors.GRAY3};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.GRAY3};
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.GRAY3} inset !important;
    box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.GRAY3} inset !important;
  }
`;
