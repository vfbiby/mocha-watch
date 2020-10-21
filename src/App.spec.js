import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App Component', function() {
  afterEach(()=>{
    cleanup()
  })

  it('should list todos', () => {
    const { getByText } = render(<App />);

    const inputNode = screen.getByPlaceholderText('todo')
    fireEvent.change(inputNode, {target: {value: 'Go Bed'}})
    fireEvent.click(getByText(/Add Todo/i))

    screen.getByText('Go Bed')
    cleanup()
    //console.log(screen.debug());
  })

  it("can complete a todo when click it", function(){
    const { getByText } = render(<App />);

    //const inputNode = screen.getByPlaceholderText('todo')
    //fireEvent.change(inputNode, {target: {value: 'Go Bed'}})
    //fireEvent.click(getByText(/Add Todo/i))
    fireEvent.click(getByText(/Go Bed/i))

    //console.log(screen.debug());
    expect(getByText(/Go Bed/i).getAttribute('style')).to.equal('text-decoration: line-through;')
    //expect(getByText(/Go Bed/i).hasAttribute('style')).to.be.true
  })
})
