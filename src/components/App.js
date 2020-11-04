import React from 'react';
import VisibleTodoList from "../containers/VisibleTodoList";
import AddTodo from '../containers/AddTodo';
import Footer from "./Footer";
import Nav from './Nav';


const App = ({ match: { params } }) => {
  return (
    <div className="App">
      <Nav />
      <AddTodo />
      <VisibleTodoList filter={ params.filter || 'SHOW_ALL' }/>
      <Footer />
    </div>
  );
}

export default App;
