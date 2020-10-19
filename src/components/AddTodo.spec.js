import React from 'react';
import AddTodo from "./AddTodo";
import {mount} from 'enzyme';
import { createStore } from "redux";
import { Provider } from "react-redux";
import VisibleTodoList from '../containers/VisibleTodoList';
import todos from "../reducers/todos";

describe('Add Todo', function() {
  let store

  beforeEach(()=>{
    store = createStore(todos)
  })

  it("can render a input and search button", function(){
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

  it("can add a todo to store", function(){
    const wrapper = mount(
      <Provider store={store}>
        <VisibleTodoList/>
        <AddTodo/>
      </Provider>
    )

    expect(wrapper.find('li').length).to.equal(1)

    wrapper.find('input[type="text"]').instance().value = 'james'
    wrapper.find('input[type="submit"]').simulate('submit')

    expect(wrapper.find('li').length).to.equal(2)
    expect(wrapper.find('li').at(1).text()).to.equal('james')
  })
});
