import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import Footer from "./Footer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe('Footer Spec', () => {
  afterEach(cleanup)

  it("should render status filter link", function(){
    let history = createMemoryHistory();
    render(
      <Router history={history}>
        <Footer />
      </Router>
    )

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

});
