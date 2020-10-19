import React from 'react';
import VisibleTodoList from "./containers/VisibleTodoList";
import AddTodo from './components/AddTodo';
import { createStore } from "redux";
import { Provider } from "react-redux";
import todos from "./reducers/todos";

let store = createStore(todos)

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          Todo
        </header>
        <main>
          <VisibleTodoList />
          <AddTodo/>
        </main>
      </div>
    </Provider>
  );
}

export default App;
