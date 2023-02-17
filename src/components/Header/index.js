import React from 'react';
import { useNavigate } from "react-router-dom";
import "./index.css"
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a className="logout-button " onClick = {handleLogout}>Logout</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
