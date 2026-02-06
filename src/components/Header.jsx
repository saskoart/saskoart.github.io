import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function Header({menuOpen, setMenuOpen}) {
    return <header className="header">
        <Button
            className="hamburgerButton"
            onClick={() => setMenuOpen(prev => !prev)}
            variant="light"
        >
            {menuOpen ? '✖' : '☰'}
        </Button>
        <div className="headerTitle">
            <Link to={"/"}><h1>SASKO ART</h1></Link>
        </div>
    </header>
}

export default Header;