import { addTodo } from "./index";

describe('Actions', function() {
  it("should have addTodo action to add todos", function(){
    const text = 'Finish docs'
    const expectedAction = {
      type: 'ADD_TODO',
      text
    }

    expect(addTodo('Finish docs')).to.deep.equal(expectedAction)
  })
});
