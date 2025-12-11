import React from 'react';
import {Button} from "react-bootstrap";

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
            <h1>SASKOART</h1>
        </div>
    </header>
}

export default Header;