const initialState = [
  {
    text: 'Use Redux',
    id: 0
  }
]

export default function todos(state = initialState, action){

  if(action.type == 'ADD_TODO'){
    return [
      ...state,
      {
        text: action.text,
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
      }
    ]
  }

  return state
}
