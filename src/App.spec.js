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
  });
});
