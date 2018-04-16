import React from 'react';
import logo from '../logo.svg';
import {NavLink, Link} from 'react-router-dom';
import Minicart from './Minicart';

const Header = () => (
    <div className="header-holder">
        <header className="header">
            <div className="header-wrapper">
                <div className="header-info">
                    <h1 className="title">
                        <Link className="main-nav--link" exact="true" to="/">
                            <img src={logo} className="logo" alt="logo" /> React.js
                        </Link>
                    </h1>
                </div>
                <div className="header-actions">
                    <Minicart />
                </div>
            </div>
        </header>
        <nav className="main-nav">
            <ul className="main-nav--list">
                <li>
                    <NavLink className="main-nav--link" activeClassName="active" exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className="main-nav--link" activeClassName="active" to="/catalog">Catalog</NavLink>
                </li>
                <li>
                    <NavLink className="main-nav--link" activeClassName="active" to="/cart">Cart</NavLink>
                </li>
                <li>
                    <NavLink className="main-nav--link" activeClassName="active" to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink className="main-nav--link" activeClassName="active" to="/counter">Counter</NavLink>
                </li>
            </ul>
        </nav>
    </div>
);

export default Header;