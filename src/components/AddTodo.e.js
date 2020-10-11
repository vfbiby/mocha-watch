import React from 'react';
import AddTodo from "./AddTodo";
//import Enzyme, { shallow, mount } from "enzyme";
//import Adapter from 'enzyme-adapter-react-16';

//Enzyme.configure({ adapter: new Adapter() });

describe('Add Todo', function() {

  it("can render a input and search button", function(){
    const wrapper = shallow(<AddTodo />)

    expect(wrapper.find('input[type="text"]').length).toBe(1)
    expect(wrapper.find('input[type="submit"]').length).toBe(1)
  })

  it("can type a todo and submit", function(){
    let spyFunction = jest.fn()

    const wrapper = mount(<AddTodo onSubmit={spyFunction}/>)
    const todoToBeType = 'Washing my clothes'

    wrapper.find('input[type="text"]').instance().value = todoToBeType
    wrapper.find('[type="submit"]').simulate('submit');
    expect(spyFunction).toHaveBeenCalledWith(todoToBeType)
  })

  it("will delete value after clicking addTodo", function(){
    const wrapper = mount(<AddTodo onSubmit={jest.fn()}/>)
    const input = wrapper.find('input[type="text"]').instance()

    input.value = 'Washing my clothes'
    wrapper.find('[type="submit"]').simulate('submit');
    expect(input.value).toBe('')
  })
});
