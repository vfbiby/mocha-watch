import React from 'react';
import AddTodo from "./AddTodo";

describe('Add Todo', function() {

  it("can render a input and search button", function(){
    const wrapper = shallow(<AddTodo />)

    expect(wrapper.find('input[type="text"]').length).to.equal(1)
    expect(wrapper.find('input[type="submit"]').length).to.equal(1)
  })

});
