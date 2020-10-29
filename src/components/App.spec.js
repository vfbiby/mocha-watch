import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { createStore } from "redux";
import todoApp from "../reducers";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import {VisibilityFilters} from '../actions';

describe('App Container', function() {

  let history;

  beforeEach(() => {
    let store = createStore(todoApp);
    history = createMemoryHistory();
    history.push('/active');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/:filter?" component={App} />
        </Router>
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
    expect(history.location.pathname).toBe(`/${VisibilityFilters.SHOW_ACTIVE}`)

    fireEvent.click(screen.getByText(/Completed/i))
    expect(screen.queryByText(/go to school/i)).toBeInTheDocument()
    expect(history.location.pathname).toBe(`/${VisibilityFilters.SHOW_COMPLETED}`)
  })
})
