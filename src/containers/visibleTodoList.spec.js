import React from 'react';
import VisibleTodoList, { getVisibleTodos } from './VisibleTodoList'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme';
import { createStore } from "redux";
import todoApp from '../reducers';

const mockStore = configureStore([])

describe('Visible TodoList', () => {
  let store
  let visibleTodoList
  let initialState

  beforeEach(() => {
    initialState = {
      todos: [
        {
          id: 1,
          text: 'Go to school',
          completed: false
        },
        {
          id: 2,
          text: 'Buy some food',
          completed: false
        },
        {
          id: 3,
          text: 'Finish screencast',
          completed: true
        }
      ],
      visibilityFilter: 'SHOW_ALL'
    }

    store = mockStore(initialState)
    //store = createStore(todoApp, initialState)
    store.dispatch = sinon.spy()
    
    visibleTodoList = mount(
      <Provider store={store}>
        <VisibleTodoList />
      </Provider>
    )
  })

  it("should render with given state from Redux store", function(){
    expect(visibleTodoList.contains('Go to school')).to.equal(true)
    expect(visibleTodoList.find('li').length).to.equal(3)
    expect(visibleTodoList.find('li').at(0).text()).to.equal('Go to school')
    expect(visibleTodoList.find('li').at(1).text()).to.equal('Buy some food')
  })

  it("should dispath an action when todo click", function(){
    visibleTodoList.find('li').at(1).simulate('click')
    expect(store.dispatch).to.have.been.callCount(1)
    expect(store.dispatch).to.have.been.calledWith({ id: 2, type: "TOGGLE_TODO" })
  })

  it("should filter todos by complete status", function(){
    expect(getVisibleTodos(initialState.todos, 'SHOW_ACTIVE').length).to.equal(2)
    expect(getVisibleTodos(initialState.todos, 'SHOW_COMPLETED').length).to.equal(1)
  })
});
