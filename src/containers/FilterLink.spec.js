import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import FilterLink from "./FilterLink";
import {Router} from "react-router-dom";
import { createMemoryHistory } from "history";
import { VisibilityFilters } from "../actions";


describe('FilterLink Container', () => {

  afterEach(cleanup)

  it("can link to active router", function(){
    let history = createMemoryHistory();
    render(
      <Router history={history}>
        <p>
          show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
          {', '}
          <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
          {', '}
          <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
        </p>      
      </Router>
    )
    fireEvent.click(screen.getByRole('link', {name: 'Active'}));
    expect(history.location.pathname).toBe(`/${VisibilityFilters.SHOW_ACTIVE}`)

    fireEvent.click(screen.getByRole('link', {name: 'All'}));
    expect(history.location.pathname).toBe('/')

    fireEvent.click(screen.getByRole('link', {name: 'Completed'}));
    expect(history.location.pathname).toBe(`/${VisibilityFilters.SHOW_COMPLETED}`)
  })

});
