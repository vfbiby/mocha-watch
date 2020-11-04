import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import BaseTableDemo from './BaseTableDemo';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/ali-react-table" component={BaseTableDemo} />
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
  )

export default Root
