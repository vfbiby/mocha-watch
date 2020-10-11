import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

let todolists = [
  {
    id: 1,
    title: 'Go to school'
  },
  {
    id: 2,
    title: 'Buy some food'
  }
]

const addTodo = (todo) => {
  todolists.push({id: 3, title: todo})
  console.log(todolists);
}

const App = () => {
  return (
    <div className="App">
      <header>
        Todo
      </header>
      <main>
        <TodoList todos={todolists} />
        <AddTodo onSubmit={addTodo}/>
      </main>
    </div>
  );
}

export default App;
