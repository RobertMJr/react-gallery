import React from 'react';
import { NavLink } from 'react-router-dom'


const Nav = () => {
    return(
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/search/cats">Cats</NavLink></li>
                <li><NavLink to="/search/foxes">Foxes</NavLink></li>
                <li><NavLink to="/search/javascript">JavaScript</NavLink></li>
            </ul>
        </nav>

    )
}

export default Nav;