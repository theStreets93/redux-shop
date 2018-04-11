import React from 'react';
import logo from '../logo.svg';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">Welcome to React</h1>
        <h3 className="subtitle">v2 - Redux Mode</h3>
        <nav className="main-nav">
            <ul className="main-nav__list">
                <li>
                    <NavLink className="nav__link" activeClassName="active" exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className="nav__link" activeClassName="active" to="/cart">Cart</NavLink>
                </li>
                <li>
                    <NavLink className="nav__link" activeClassName="active" to="/catalog">Catalog</NavLink>
                </li>
                <li>
                    <NavLink className="nav__link" activeClassName="active" to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink className="nav__link" activeClassName="active" to="/counter">Counter</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default Header;