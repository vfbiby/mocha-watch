import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Container', function() {
  afterEach(cleanup)

  it('should list todos', () => {
    render(<App />);

    const inputNode = screen.getByRole('textbox')
    // fireEvent.change(inputNode, {target: {value: 'Go Bed'}})
    userEvent.type(inputNode, 'Go Bed')
    userEvent.click(screen.getByText(/Add Todo/i))

    expect(screen.getByText('Go Bed')).toBeInTheDocument()
  })

  it("can complete a todo when click it", function(){
    const { getByText } = render(<App />);

    //const inputNode = screen.getByRole('textbox')
    //fireEvent.change(inputNode, {target: {value: 'Go Bed'}})
    //fireEvent.click(screen.getByText(/Add Todo/i))
    userEvent.click(getByText(/Go Bed/i))

    expect(getByText(/Go Bed/i).getAttribute('style')).toEqual('text-decoration: line-through;')
  })

  it("can filter todos", function(){
    render(<App />);

    const inputNode = screen.getByRole('textbox')
    fireEvent.change(inputNode, {target: {value: 'Go to school'}})
    fireEvent.click(screen.getByText(/Add Todo/i))
    fireEvent.change(inputNode, {target: {value: 'Finish screencast'}})
    fireEvent.click(screen.getByText(/Add Todo/i))
    fireEvent.click(screen.getByText(/go to school/i))
    fireEvent.click(screen.getByText(/Completed/i))

    expect(screen.getByText(/go to school/i)).toBeInTheDocument()
  })
})
