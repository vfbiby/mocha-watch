import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import App from './App';

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

    fireEvent.click(getByText(/Go Bed/i))

    expect(getByText(/Go Bed/i).getAttribute('style')).to.equal('text-decoration: line-through;')
  })
})
