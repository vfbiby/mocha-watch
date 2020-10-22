import { addTodo, toggleTodo, setVisibilityFilter } from "./index";

describe('Actions', function() {
  it("should have addTodo action to add todos", function(){
    const text = 'Finish docs'
    const expectedAction = {
      type: 'ADD_TODO',
      text
    }

    expect(addTodo('Finish docs')).to.deep.equal(expectedAction)
  })

  it("should have toggleTodo action creater", function(){
    const expectedAction = {
      type: 'TOGGLE_TODO',
      id: 0
    }

    expect(toggleTodo(0)).to.deep.equal(expectedAction)
  })

  it("shoud have a setVisibilityFilter action creater", function(){
    const expectedAction = {
      type: 'SET_VISIBILITY_FILTER',
      filter: 'All'
    }

    expect(setVisibilityFilter('All')).to.deep.equal(expectedAction)
  })
});
