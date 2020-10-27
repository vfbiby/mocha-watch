import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { createStore } from "redux";
import todoApp from "../reducers";
import { Provider } from "react-redux";

describe('App Container', function() {


  beforeEach(() => {
  let store = createStore(todoApp);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  })

  afterEach(cleanup)

  it('should list todos', () => {


    const inputNode = screen.getByRole('textbox')
    userEvent.type(inputNode, 'Go Bed')
    userEvent.click(screen.getByText(/Add Todo/i))

    expect(screen.getByText('Go Bed')).toBeInTheDocument()
  })

  it("can complete a todo when click it", function(){

    const inputNode = screen.getByRole('textbox')
    fireEvent.change(inputNode, {target: {value: 'Go Bed'}})
    fireEvent.click(screen.getByText(/Add Todo/i))
    userEvent.click(screen.getByText(/Go Bed/i))

    expect(screen.getByText(/Go Bed/i).getAttribute('style')).toEqual('text-decoration: line-through;')
  })

  it("can filter todos", function(){

    const inputNode = screen.getByRole('textbox')
    fireEvent.change(inputNode, {target: {value: 'Go to school'}})
    fireEvent.click(screen.getByText(/Add Todo/i))
    fireEvent.change(inputNode, {target: {value: 'Finish screencast'}})
    fireEvent.click(screen.getByText(/Add Todo/i))
    fireEvent.click(screen.getByText(/go to school/i))
    fireEvent.click(screen.getByText(/Active/i))

    expect(screen.queryByText(/go to school/i)).not.toBeInTheDocument()
  })
})