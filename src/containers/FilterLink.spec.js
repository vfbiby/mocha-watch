import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import FilterLink from "./FilterLink";
import {Router} from "react-router-dom";
import { createMemoryHistory } from "history";


describe('FilterLink Container', () => {

  afterEach(cleanup)

  it("can link to active router", function(){
    let history = createMemoryHistory();
    render(
      <Router history={history}>
        <FilterLink filter="active">Active</FilterLink>
      </Router>
    )
    fireEvent.click(screen.getByRole('link', {name: 'Active'}));

    expect(history.location.pathname).toBe('/active')
  })

});
