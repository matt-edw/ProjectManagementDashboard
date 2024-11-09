import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // You will create this CSS file next

function Header() {
    return (
        <header className="header">
            <Link to="/home" className="header-title">
                Product Management Dashboard
            </Link>
            <hr className="header-line" />
        </header>
    );
}

export default Header;