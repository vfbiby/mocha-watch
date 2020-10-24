import visibilityFilter from "./visibilityFilter";
import { toggleTodo, setVisibilityFilter } from "../actions";
import reducer from "./todos";
import todoApp from ".";
import { createStore } from "redux";

describe('Reducer Test', function() {
  it("should render the initial state", function(){
    const expectedState = []
    expect(reducer(undefined, {})).to.deep.equal(expectedState)
  })

  it("should handle ADD_TODO", function(){
    const expectedState = [
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      },
      {
        text: 'Go to street',
        completed: false,
        id: 1
      }
    ]

    expect(
      reducer(
        [{ 
          text: 'Run the tests',
          completed: false,
          id: 0
        }],
        { 
          type: 'ADD_TODO', 
          text: 'Go to street' 
        }
      )
    ).to.deep.equal(expectedState)
  })

  it("the complete status should be false when a todo is been added", function(){
    const expectedState = [{
      id: 0,
      text: 'Go to street',
      completed: false
    }]
    expect(reducer([], {type: 'ADD_TODO', text: 'Go to street'})).to.deep.equal(expectedState)
  })
  
  it("should handle TOGGLE_TODO action", function(){
    const expectedState = [
      {
        text: 'Run the tests',
        completed: true,
        id: 0
      }
    ]

    expect(
      reducer(
        [{ 
          text: 'Run the tests',
          completed: false,
          id: 0
        }],
        toggleTodo(0)
      )
    ).to.deep.equal(expectedState)
  })

  it("should handle SET_VISIBILITY_FILTER", function(){
    const expectedState = 'SHOW_ACTIVE'

    expect(
      visibilityFilter(
        'SHOW_ALL',
        {type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ACTIVE'}
      )
    ).to.deep.equal(expectedState)
  })

  it("should return SHOW_ALL when action is not provide", function(){
    expect(
      visibilityFilter(
        undefined,
        {}
      )
    ).to.deep.equal('SHOW_ALL')
  })
});
