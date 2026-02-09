import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">
        <Button>Return to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
