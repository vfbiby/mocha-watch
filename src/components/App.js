import React from 'react';
import VisibleTodoList from "../containers/VisibleTodoList";
import AddTodo from '../containers/AddTodo';
import Footer from "./Footer";


const App = ({ match: { params } }) => {
  return (
    <div className="App">
      <AddTodo />
      <VisibleTodoList filter={ params.filter || 'SHOW_ALL' }/>
      <Footer />
    </div>
  );
}

export default App;
