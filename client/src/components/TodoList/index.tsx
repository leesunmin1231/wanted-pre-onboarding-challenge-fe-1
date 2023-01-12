import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import type todoResponseType from '../../types/TodoResponse';
import TodoInputBox from './TodoInputBox';
import TodoItemBox from './TodoItemBox';
import { httpGet } from '../../util/http';
import Loading from '../Loading';
import useModal from '../../hooks/useModal';

function TodoList() {
  const [currentTodoList, setCurrentTodoList] = useState<todoResponseType[]>([]);
  const { setContent, closeModal } = useModal();
  const { isLoading } = useQuery(['todos'], () => httpGet('/todos'), {
    refetchOnWindowFocus: true,
    staleTime: 60 * 1000,
    onSuccess: (data) => setCurrentTodoList([...data]),
    onError: (error) => setContent(`${error}`, [{ name: '확인', handler: closeModal }]),
  });
  return (
    <Wrapper>
      <Header>Todo List</Header>
      <ListBox>
        <TodoInputBox />
        {isLoading ? <Loading /> : currentTodoList.map((item) => <TodoItemBox key={item.id} currentTodo={item} />)}
      </ListBox>
    </Wrapper>
  );
}

export default React.memo(TodoList);

const Wrapper = styled.div`
  width: 700px;
  padding-bottom: 50px;
  margin-top: 30px;
`;

const Header = styled.header`
  font-size: 40px;
  width: 700px;
  height: 60px;
  text-align: center;
  color: ${({ theme }) => theme.colors.PRIMARY};
`;
const ListBox = styled.div`
  width: 100%;
  height: min-content;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 5px 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
