import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { todoList } from '../../atom';
import TodoInputBox from './TodoInputBox';
import TodoItemBox from './TodoItemBox';
import { httpGet } from '../../util/http';
import useTokenError from '../../hooks/useTokenError';
import todoType from '../../types/TodoList';

function TodoList() {
  const [currentTodoList, setCurrentTodoList] = useRecoilState(todoList);
  const { tokenError } = useTokenError();
  const fetchData = async (token: string) => {
    const response: { data: { data: todoType[] } } = await httpGet('/todos', token);
    setCurrentTodoList([...currentTodoList, ...response.data.data]);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null) {
      tokenError();
      return;
    }
    fetchData(token);
  }, [setCurrentTodoList]);
  return (
    <Wrapper>
      <Header>Todo List</Header>
      <ListBox>
        <TodoInputBox />
        {currentTodoList.map((item) => (
          <TodoItemBox key={item.id} currentTodo={item} />
        ))}
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
`;
