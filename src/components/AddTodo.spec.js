import React from 'react';
import AddTodo from "./AddTodo";
import {mount} from 'enzyme';
import { createStore } from "redux";
import { Provider } from "react-redux";

describe('Add Todo', function() {

  it("can render a input and search button", function(){
    let store = createStore(()=>{})
    let dispatch = sinon.spy()
    store.dispatch = dispatch

    const wrapper = mount(
      <Provider store={store}>
        <AddTodo/>
      </Provider>
    )

    expect(dispatch).to.have.been.callCount(0)
    expect(wrapper.find('input[type="text"]').length).to.equal(1)
    expect(wrapper.find('input[type="submit"]').length).to.equal(1)

    wrapper.find('input[type="text"]').instance().value = 'james'
    wrapper.find('input[type="submit"]').simulate('submit')
    expect(dispatch).to.have.been.callCount(1)
    expect(dispatch).to.have.been.calledWith({ text: "james", type: "ADD_TODO" })
  })

});
