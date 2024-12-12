import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this path is correct

function Navbar({ user }) {
  console.log('Navbar user prop:', user); // Debugging

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
      </div>

      {/* Center Section */}
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/thrift">Thrift</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/profile" className="navbar-profile">
              Profile
            </Link>
            <Link to="/cart" className="navbar-cart">
              Cart
            </Link>
          </>
        ) : (
          <p>Not logged in</p> // Fallback content for debugging
        )}
      </div>
    </nav>
  );
}

export default Navbar;
