import React from 'react';
import VisibleTodoList from './VisibleTodoList'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme';
import { createStore } from "redux";

const mockStore = configureStore([])

describe('Visible TodoList connected component', () => {
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
    //store = mockStore(initailState)

    store = createStore(()=>{ return initailState })
    
    visibleTodoList = mount(
      <Provider store={store}>
        <VisibleTodoList />
      </Provider>
    )
  })

  it("should render with given state from Redux store", function(){
    //let spy = sinon.spy()

    expect(visibleTodoList.contains('Go to school')).to.equal(true)
    expect(visibleTodoList.find('li').length).to.equal(2)
    expect(visibleTodoList.find('li').at(0).text()).to.equal('Go to school')
    expect(visibleTodoList.find('li').at(1).text()).to.equal('Buy some food')
  })
});
