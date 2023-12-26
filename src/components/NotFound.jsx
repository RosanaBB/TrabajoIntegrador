import React from 'react';
import NotFoundComponent from './NotFound';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>404 Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <img src="https://via.placeholder.com/400" alt="404 Not Found" />
    </div>
  );
};

export default NotFoundComponent;
