import reducer from "./todos";

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
});
