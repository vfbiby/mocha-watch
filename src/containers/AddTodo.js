import React from 'react';
import { addTodo } from "../actions/index";
import { connect } from "react-redux";

let AddTodo = ({dispatch}) => {
  let input

  return (
    <div>
      <form 
        onSubmit={e => {
          e.preventDefault()
          if(!input.value.trim()){
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          type="text"
          key="todo"
          placeholder="todo"
          ref={node=> { input = node } }
        />
        <input type="submit" value="Add Todo"/>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
