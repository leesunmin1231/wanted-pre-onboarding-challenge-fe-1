import React, { useState, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { SmallButton } from '../../../styles/common';
import { todoList } from '../../../atom';
import todoType from '../../../types/TodoList';
import useModal from '../../../hooks/useModal';
import useTokenError from '../../../hooks/useTokenError';
import { httpDelete, httpPut } from '../../../util/http';

function TodoItemBox({ currentTodo }: { currentTodo: todoType }) {
  const setCurrentTodoList = useSetRecoilState(todoList);
  const [newTodo, setNewTodo] = useState(currentTodo.title);
  const [editing, setEditing] = useState(false);
  const { tokenError } = useTokenError();
  const { setContent, closeModal } = useModal();

  const fetchUpdateTodo = async (token: string) => {
    const response = await httpPut(`/todos/${currentTodo.id}`, token, { title: newTodo, content: '' });
    const updateData = response.data.data;
    setCurrentTodoList((prevState) => prevState.map((todo) => (todo.id === updateData.id ? { ...updateData } : todo)));
    setNewTodo(updateData.title);
  };
  const updateTodo = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      tokenError();
      return;
    }
    fetchUpdateTodo(token);
    setNewTodo('');
  };
  const handleTodoSubmit = (e: KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      setEditing(false);
      updateTodo();
    }
  };

  const editHandler = () => {
    setEditing(true);
  };
  const deleteTodo = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      tokenError();
      return;
    }
    httpDelete(`/todos/${currentTodo.id}`, token);
    setCurrentTodoList((prevState) => prevState.filter((todo) => todo.id !== currentTodo.id));
    closeModal();
  };
  const deleteHandler = () => {
    setContent('삭제 하시겠습니까?', [
      { name: '취소', handler: closeModal },
      { name: '삭제', handler: deleteTodo },
    ]);
  };
  return (
    <Wrapper>
      {editing ? (
        <EditBox>
          <InputBox
            type="text"
            placeholder=""
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleTodoSubmit}
            value={newTodo}
            autoFocus
          />
        </EditBox>
      ) : (
        <TodoBox>
          <TextBox>
            <IncompleteText>{currentTodo.title}</IncompleteText>
          </TextBox>
          <ButtonWrapper>
            <SmallButton onClick={() => editHandler()} isDelete={false}>
              수정
            </SmallButton>
            <SmallButton onClick={() => deleteHandler()} isDelete>
              삭제
            </SmallButton>
          </ButtonWrapper>
        </TodoBox>
      )}
    </Wrapper>
  );
}

export default React.memo(TodoItemBox);

const Wrapper = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY3};
`;

const EditBox = styled.div`
  width: 95%;
`;

const InputBox = styled.input`
  width: 100%;
  height: 54px;
  border: 0px;
  font-size: 30px;
  padding: 0px 15px;
  &:focus {
    outline-style: none;
  }
  &::placeholder {
    user-select: none;
    color: ${({ theme }) => theme.colors.GRAY4};
  }
`;

const TodoBox = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  padding: 0px 15px;
  &:first-of-type {
    border-top: 0px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
`;

const TextBox = styled.button`
  flex: 1;
  border: 0px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  text-align: left;
  cursor: pointer;
`;

const IncompleteText = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 25px;
`;
