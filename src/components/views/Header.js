/*
    dog-client is the client component of an online web implementation of dog.
    Copyright (C) 2022  Luca Zwahlen

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/


import PropTypes from "prop-types";
import React from "react";
import "styles/views/Header.scss";

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = props => (
  <div className="header container">
    <img src="/resources/logo_bright.svg"></img>
  </div>
);

Header.propTypes = {
  height: PropTypes.string
};

/**
 * Don't forget to export your component!
 */
export default Header;
