import React, { useState, KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { useSetRecoilState, SetterOrUpdater } from 'recoil';
import { SmallButton } from '../../../styles/common';
import { todoList, completeList } from '../../../atom';
import todoType from '../../../types/TodoList';
import useModal from '../../../hooks/useModal';

function TodoItemBox({ currentTodo }: { currentTodo: todoType }) {
  const setCurrentTodoList = useSetRecoilState(todoList);
  const setCompleteTodoList = useSetRecoilState(completeList);
  const [newTodo, setNewTodo] = useState(currentTodo.content);
  const { setContent, closeModal } = useModal();

  const setContentState = (setter: SetterOrUpdater<todoType[]>) => {
    setter((prevState) =>
      prevState.map((todo) => {
        if (todo.key === currentTodo.key) return { ...todo, content: newTodo, editing: false };
        return { ...todo };
      })
    );
  };
  const setEditingState = (setter: SetterOrUpdater<todoType[]>) => {
    setter((prevState) =>
      prevState.map((todo) => {
        if (todo.key === currentTodo.key) return { ...todo, editing: true };
        return { ...todo };
      })
    );
  };

  const handleTodoSubmit = (e: KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      if (currentTodo.done) {
        setContentState(setCompleteTodoList);
      } else {
        setContentState(setCurrentTodoList);
      }
    }
  };

  const editHandler = () => {
    if (currentTodo.done) {
      setEditingState(setCompleteTodoList);
    } else {
      setEditingState(setCurrentTodoList);
    }
  };
  const deleteTodo = () => {
    if (currentTodo.done) {
      setCompleteTodoList((prevState) => prevState.filter((todo) => todo.key !== currentTodo.key));
    } else {
      setCurrentTodoList((prevState) => prevState.filter((todo) => todo.key !== currentTodo.key));
    }
    closeModal();
  };
  const deleteHandler = () => {
    setContent('삭제 하시겠습니까?', [
      { name: '취소', handler: closeModal },
      { name: '삭제', handler: deleteTodo },
    ]);
  };
  const toggleDoneState = () => {
    if (currentTodo.done) {
      setCompleteTodoList((prevState) => prevState.filter((todo) => todo.key !== currentTodo.key));
      setCurrentTodoList((prevState) => prevState.concat({ ...currentTodo, done: false }));
    } else {
      setCurrentTodoList((prevState) => prevState.filter((todo) => todo.key !== currentTodo.key));
      setCompleteTodoList((prevState) => prevState.concat({ ...currentTodo, done: true }));
    }
  };
  return (
    <Wrapper>
      {currentTodo.editing ? (
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
          <TextBox onClick={() => toggleDoneState()}>
            {currentTodo.done ? (
              <CompleteText>{currentTodo.content}</CompleteText>
            ) : (
              <IncompleteText>{currentTodo.content}</IncompleteText>
            )}
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

const CompleteText = styled.s`
  color: ${({ theme }) => theme.colors.GRAY2};
  font-size: 25px;
`;

const IncompleteText = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 25px;
`;
