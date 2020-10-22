import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import FilterLink from "./FilterLink";

const mockStore = configureStore([])

describe('FilterLink Spec', () => {

  afterEach(cleanup)

  it("should dispatch a action when click a filter link", function(){
    let store = mockStore([])
    render(
      <Provider store={store}>
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
      </Provider>
    )

    fireEvent.click(screen.getByText('Completed'))

    expect(store.getActions()[0]).to.deep.equal(
      {type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED'}
    )
  })

  it("should know if it is active", function(){
    let store = mockStore({
      visibilityFilter: 'SHOW_ALL'
    })
    store.dispatch = sinon.spy()

    render(
      <Provider store={store}>
        <FilterLink filter="SHOW_ALL">All</FilterLink>
      </Provider>
    )

    fireEvent.click(screen.getByText('All'))
    expect(store.dispatch).to.have.been.callCount(0)

    expect(store.getActions()).to.deep.equal([])

  })
});
