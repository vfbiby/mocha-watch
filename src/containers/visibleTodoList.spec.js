import React from 'react';
import VisibleTodoList from './VisibleTodoList'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme';
import { createStore } from "redux";
import todos from '../reducers/todos';

const mockStore = configureStore([])

describe('Visible TodoList', () => {
  let store
  let visibleTodoList

  beforeEach(() => {
    let initailState = [
      {
        id: 1,
        text: 'Go to school'
      },
      {
        id: 2,
        text: 'Buy some food'
      }
    ]

    store = mockStore(initailState)
    store.dispatch = sinon.spy()
    //store = createStore(()=>{ return todos(initailState) })
    
    visibleTodoList = mount(
      <Provider store={store}>
        <VisibleTodoList />
      </Provider>
    )
  })

  it("should render with given state from Redux store", function(){
    expect(visibleTodoList.contains('Go to school')).to.equal(true)
    expect(visibleTodoList.find('li').length).to.equal(2)
    expect(visibleTodoList.find('li').at(0).text()).to.equal('Go to school')
    expect(visibleTodoList.find('li').at(1).text()).to.equal('Buy some food')
  })

  it("should dispath an action when todo click", function(){
    visibleTodoList.find('li').at(1).simulate('click')
    expect(store.dispatch).to.have.been.callCount(1)
    expect(store.dispatch).to.have.been.calledWith({ id: 2, type: "TOGGLE_TODO" })
  })
});
