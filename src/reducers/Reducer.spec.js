import reducer from "./todos";

describe('Reducer Test', function() {
  it("should render the initial state", function(){
    const expectedState = [
      {
        text: 'Use Redux',
        id: 0
      }
    ]
    expect(reducer(undefined, {})).to.deep.equal(expectedState)
  })

  it("should handle ADD_TODO", function(){
    const expectedState = [
      {
        text: 'Run the tests',
        id: 0
      }
    ]

    const action = { 
      type: 'ADD_TODO', 
      text: 'Run the tests' 
    }

    expect(reducer([], action)).to.deep.equal(expectedState)
  })
});
