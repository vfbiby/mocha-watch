import React from 'react';
import { Link } from "react-router-dom";

const FilterLink = ({ children }) => (
  <Link
    to="active"
  >
    {children}
  </Link>
)

export default FilterLink;
