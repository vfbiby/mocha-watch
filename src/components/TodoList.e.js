import React from 'react';
//import Enzyme, { shallow } from "enzyme";
//import Adapter from 'enzyme-adapter-react-16';
import TodoList from "./TodoList";

//Enzyme.configure({ adapter: new Adapter() });

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

    expect(wrapper.find('li').length).toBe(2)
    expect(wrapper.find('li').at(0).text()).toBe('Go to school')
    expect(wrapper.find('li').at(1).text()).toBe('Buy some food')
  })
})
