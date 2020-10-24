import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import App from './App';
import expect from "expect";

describe('App Component', function() {
  afterEach(cleanup)

  it('should list todos', () => {
    render(<App />);

    const inputNode = screen.getByRole('textbox')
    fireEvent.change(inputNode, {target: {value: 'Go Bed'}})
    fireEvent.click(screen.getByText(/Add Todo/i))

    expect(screen.getByText('Go Bed')).toBeInTheDocument()
  })

  it("can complete a todo when click it", function(){
    const { getByText } = render(<App />);

    //const inputNode = screen.getByRole('textbox')
    //fireEvent.change(inputNode, {target: {value: 'Go Bed'}})
    //fireEvent.click(screen.getByText(/Add Todo/i))
    fireEvent.click(getByText(/Go Bed/i))

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
    fireEvent.click(screen.getByText(/Active/i))

    expect(screen.getByText(/go to school/i)).not.toBeInTheDocument()
  })
})
