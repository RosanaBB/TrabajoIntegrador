
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Layout.css'; 

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/authentication">Authentication</Link>
          </li>
          <li>
            <Link to="/product-creation-edit">Product Creation/Edit</Link>
          </li>
          <li>
            <Link to="/category-creation-edit">Category Creation/Edit</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />

      <footer>Hola soy un footer</footer>
    </div>
  );
};

export default Layout;
