import React from 'react';
import AddTodo from "./AddTodo";
import {mount} from 'enzyme';

describe('Add Todo', function() {

  it("can render a input and search button", function(){
    let cb = sinon.spy()

    const wrapper = mount(<AddTodo onSubmit={cb}/>)

    expect(cb).to.have.been.callCount(0)
    expect(wrapper.find('input[type="text"]').length).to.equal(1)
    expect(wrapper.find('input[type="submit"]').length).to.equal(1)

    wrapper.find('input[type="text"]').instance().value = 'james'
    wrapper.find('input[type="submit"]').simulate('submit')
    expect(cb).to.have.been.callCount(1)
    expect(cb).to.have.been.calledWith('james')
  })

});
