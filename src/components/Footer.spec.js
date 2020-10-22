import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import Footer from "./Footer";
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';

const mockStore = configureStore([])

describe('Footer Spec', () => {
  afterEach(cleanup)

  it("should render status filter link", function(){
    let store = mockStore({
      visibilityFilter: 'SHOW_ALL'
    })
    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    )

    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

});
