import React, { useState, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { SmallButton, EmojiButton, WriteDetail } from '../../../styles/common';
import { todoList } from '../../../atom';
import todoType from '../../../types/TodoList';
import useModal from '../../../hooks/useModal';
import useTokenError from '../../../hooks/useTokenError';
import { httpDelete, httpPut } from '../../../util/http';

function TodoItemBox({ currentTodo }: { currentTodo: todoType }) {
  const setCurrentTodoList = useSetRecoilState(todoList);
  const [newTodo, setNewTodo] = useState({ title: currentTodo.title, content: currentTodo.content });
  const [editing, setEditing] = useState(false);
  const [toggleDetailBox, setToggleDetailBox] = useState(false);
  const { tokenError } = useTokenError();
  const { setContent, closeModal } = useModal();

  const fetchUpdateTodo = async (token: string) => {
    const response = await httpPut(`/todos/${currentTodo.id}`, token, { ...newTodo });
    const updateData = response.data.data;
    setCurrentTodoList((prevState) => prevState.map((todo) => (todo.id === updateData.id ? { ...updateData } : todo)));
    setNewTodo({ title: updateData.title, content: updateData.content });
  };
  const updateTodo = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      tokenError();
      return;
    }
    fetchUpdateTodo(token);
  };

  const handleTodoSubmit = () => {
    setEditing(false);
    setToggleDetailBox(false);
    updateTodo();
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      handleTodoSubmit();
    }
  };

  const editHandler = () => {
    setEditing(true);
    setToggleDetailBox(true);
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
    <Wrapper displayWriteBox={toggleDetailBox}>
      {editing ? (
        <TitleBox>
          <InputBox
            type="text"
            placeholder=""
            onChange={(e) => setNewTodo((prevState) => ({ ...prevState, title: e.target.value }))}
            onKeyDown={handleKeyDown}
            value={newTodo.title}
            autoFocus
          />
          <EmojiButton onClick={handleTodoSubmit}>✓</EmojiButton>
        </TitleBox>
      ) : (
        <TitleBox>
          <ToggleDetailButton onClick={() => setToggleDetailBox(!toggleDetailBox)}>
            <IncompleteText>{currentTodo.title}</IncompleteText>
          </ToggleDetailButton>
          <ButtonWrapper>
            <SmallButton onClick={() => editHandler()} isDelete={false}>
              수정
            </SmallButton>
            <SmallButton onClick={() => deleteHandler()} isDelete>
              삭제
            </SmallButton>
          </ButtonWrapper>
        </TitleBox>
      )}
      <ContentBox displayWriteBox={toggleDetailBox}>
        {toggleDetailBox && (
          <WriteDetail
            placeholder=""
            onChange={(e) => setNewTodo((prevState) => ({ ...prevState, content: e.target.value }))}
            value={newTodo.content}
            disabled={!editing}
          />
        )}
      </ContentBox>
    </Wrapper>
  );
}

export default React.memo(TodoItemBox);

const Wrapper = styled.div<{ displayWriteBox: boolean }>`
  width: 100%;
  height: ${({ displayWriteBox }) => (displayWriteBox ? '255px' : '55px')};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY3};
`;

const TitleBox = styled.div`
  display: flex;
  width: 95%;
  height: 54px;
  align-items: center;
`;

const ContentBox = styled.div<{ displayWriteBox: boolean }>`
  width: 100%;
  height: ${({ displayWriteBox }) => (displayWriteBox ? '200px' : '0px')};
  transition: all 0.3s ease;
`;

const InputBox = styled.input`
  width: 100%;
  height: 54px;
  border: 0px;
  font-size: 30px;
  &:focus {
    outline-style: none;
  }
  &::placeholder {
    user-select: none;
    color: ${({ theme }) => theme.colors.GRAY4};
  }
`;

const ButtonWrapper = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
`;

const ToggleDetailButton = styled.button`
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
