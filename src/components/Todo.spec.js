import React from 'react';
import Todo from "./Todo";

describe('Todo spec', () => {
  it("can render a uncomplete todo", function(){
    const todo = {
      text: 'Go to school',
      complete: false,
      id: 0
    }

    let wrapper = shallow(<Todo {...todo} />)

    expect(wrapper.find('li').text()).to.equal('Go to school')
    expect(wrapper.find('li').prop('style')).to.deep.equal({ 'textDecoration': '' })
  })

  it("can render a completed todo with line-through text-decoration", function(){
    const todo = {
      text: 'Go to school',
      completed: true,
      id: 0
    }

    let wrapper = shallow(<Todo {...todo} />)

    expect(wrapper.find('li').prop('style')).to.deep.equal({ 'textDecoration': 'line-through' })
  })

  it("can be clicked to complete a todo", function(){
    const todo = {
      text: 'Go to school',
      completed: true,
      id: 0
    }

    const onTodoClick = sinon.spy()
    let wrapper = shallow(<Todo {...todo} onClick={()=>{onTodoClick(todo.id)}}/>)
    wrapper.find('li').simulate('click')

    expect(onTodoClick).to.have.been.callCount(1)
    expect(onTodoClick).to.have.been.calledWith(0)
  })
});
