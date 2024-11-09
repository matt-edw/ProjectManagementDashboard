import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to the Product Management Dashboard!</h1>
            <div className="button-container">
                <Link to="/add-product" className="button">
                    Add Product
                </Link>
                <Link to="/view-products" className="button">
                    View Products
                </Link>
            </div>
        </div>
    );
}

export default Home;