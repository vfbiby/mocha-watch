import React from 'react';
import VisibleTodoList from "./containers/VisibleTodoList";
import AddTodo from './containers/AddTodo';
import { createStore } from "redux";
import { Provider } from "react-redux";
import todos from "./reducers/todos";
import Footer from "./components/Footer";

let store = createStore(todos)

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          Todo
        </header>
        <main>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </main>
      </div>
    </Provider>
  );
}

export default App;
