import React from 'react';
import Todo from './Todo';

const TodoList = ({todos}) => {
  return (
    <ul>
      { todos.map((todo) => <Todo key={todo.id} {...todo} />) }
    </ul>
  )
}

export default TodoList
