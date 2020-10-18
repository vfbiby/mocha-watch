import React from 'react';
import AddTodo from "./AddTodo";
import {mount} from 'enzyme';

describe('Add Todo', function() {

  it("can render a input and search button", function(){
    const wrapper = mount(<AddTodo />)

    expect(wrapper.find('input[type="text"]').length).to.equal(1)
    expect(wrapper.find('input[type="submit"]').length).to.equal(1)
  })

});
