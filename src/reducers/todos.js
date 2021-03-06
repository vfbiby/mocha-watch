import {ADD_TODO, TOGGLE_TODO} from "../actions"

export default function todos(state = [], action = {}){

  switch (action.type){
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
        }
      ]
    case TOGGLE_TODO:
      return state.map(todo=>
        (todo.id === action.id)
        ? {...todo, completed : !todo.completed}
        : todo
      )
    default:
      return state
  }
}
