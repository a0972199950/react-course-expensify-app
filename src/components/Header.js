import React from "react";
// BrowserRouter用來裝入所有的routes，而Route則用來實際宣告route`
// Switch則是用來創建404 page
import {NavLink} from "react-router-dom";

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact>Home Page</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Page</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help Page</NavLink>
    </header>
);

export default Header;
