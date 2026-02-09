import React from 'react';

const Button = ({ variant = 'primary', size = 'md', type = 'button', children, ...props }) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
