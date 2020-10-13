import React from 'react';
import TodoList from "./TodoList";


describe("TodoList", function(){
  it("can render todo list", function(){
    const todolists = [
      {
        id: 1,
        title: 'Go to school'
      },
      {
        id: 2,
        title: 'Buy some food'
      }
    ]

    const wrapper = shallow(<TodoList todos={todolists}/>)

    expect(2).to.equal(2)

    expect(wrapper.find('li').length).to.equal(2)
    expect(wrapper.find('li').at(0).text()).to.equal('Go to school')
    expect(wrapper.find('li').at(1).text()).to.equal('Buy some food')
  })
})
