
export default function todos(state = [], action = {}){

  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
        }
      ]
    default:
      return state
  }
}
