import React, { KeyboardEvent, useState, useRef, useEffect, RefObject } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { todoList } from '../../../atom';
import { EmojiButton } from '../../../styles/common';
import useTokenError from '../../../hooks/useTokenError';
import { httpPost } from '../../../util/http';
import WriteDetail from '../../WriteDetail';

export default function TodoInputBox() {
  const setCurrentTodoList = useSetRecoilState(todoList);
  const [toggleWriteBox, setToggleWriteBox] = useState(false);
  const titleInputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const { tokenError } = useTokenError();
  const [newTodo, setNewTodo] = useState('');

  const fetchNewTodo = async (token: string) => {
    const response = await httpPost('/todos', token, { title: newTodo, content: '' });
    setCurrentTodoList((prevState) => prevState.concat(response.data.data));
  };
  const createNewTodo = () => {
    const token = localStorage.getItem('token');
    if (token === null) {
      tokenError();
      return;
    }
    fetchNewTodo(token);
    setNewTodo('');
  };

  const handleTodoSubmit = (e: KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      createNewTodo();
      setToggleWriteBox(!toggleWriteBox);
    }
  };

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [toggleWriteBox]);
  return (
    <Wrapper displayWriteBox={toggleWriteBox}>
      {toggleWriteBox ? (
        <>
          <TitleBox>
            <InputBox
              type="text"
              placeholder="제목"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleTodoSubmit}
              value={newTodo}
              ref={titleInputRef}
            />
            <EmojiButton
              onClick={() => {
                createNewTodo();
                setToggleWriteBox(!toggleWriteBox);
              }}
            >
              ✓
            </EmojiButton>
          </TitleBox>
          <WriteDetail />
        </>
      ) : (
        <TitleBox onClick={() => setToggleWriteBox(!toggleWriteBox)}>
          <InputBox
            type="text"
            placeholder="무엇을 해야하나요?"
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleTodoSubmit}
            value={newTodo}
            disabled
          />
          <EmojiButton>+</EmojiButton>
        </TitleBox>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div<{ displayWriteBox: boolean }>`
  width: 100%;
  height: ${({ displayWriteBox }) => (displayWriteBox ? '260px' : '60px')};
  transition: all 0.3s ease;
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
`;
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
    background-color: ${({ theme }) => theme.colors.WHITE};
  }
`;
