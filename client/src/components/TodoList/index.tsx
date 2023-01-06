import React from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { todoList, completeList } from '../../atom';
import TodoInputBox from './TodoInputBox';
import TodoItemBox from './TodoItemBox';

function TodoList() {
  const currentTodoList = useRecoilValue(todoList);
  const completeTodoList = useRecoilValue(completeList);
  return (
    <Wrapper>
      <Header>Todo List</Header>
      <ListBox>
        <TodoInputBox />
        {currentTodoList.map((item) => (
          <TodoItemBox key={item.key} currentTodo={item} />
        ))}
        {completeTodoList.map((item) => (
          <TodoItemBox key={item.key} currentTodo={item} />
        ))}
      </ListBox>
    </Wrapper>
  );
}

export default React.memo(TodoList);

const Wrapper = styled.div`
  width: 500px;
  padding-bottom: 50px;
`;

const Header = styled.header`
  font-size: 40px;
  width: 500px;
  height: 120px;
  padding-top: 60px;
  text-align: center;
  color: ${({ theme }) => theme.colors.PRIMARY};
`;
const ListBox = styled.div`
  width: 100%;
  height: min-content;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 5px 1px;
`;
