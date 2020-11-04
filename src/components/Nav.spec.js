import React from 'react';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import Nav from "./Nav";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe('Navbar', function() {
  afterEach(cleanup)

  it("should show ali-react-table link and perform a navigation", function(){
    let history = createMemoryHistory();
    render(
      <Router history={history}>
        <Nav />
      </Router>
    );

    fireEvent.click(
      screen.getByRole('link', {name: 'ali-react-table'})
    );
    expect(history.location.pathname).to.equal('/ali-react-table');
  })
});
