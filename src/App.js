import React from 'react';
import VisibleTodoList from "./containers/VisibleTodoList";
import AddTodo from './containers/AddTodo';
import { createStore } from "redux";
import { Provider } from "react-redux";
import Footer from "./components/Footer";
import todoApp from "./reducers";

let store = createStore(todoApp)

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
