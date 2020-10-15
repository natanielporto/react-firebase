import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className='App bg-secondary'>
        <Link
          className='mb-0 py-4 text-primary d-flex justify-content-center'
          to='/'
          style={{ textDecoration: 'none' }}
        >
          <h1 style={{ fontWeight: 700, fontSize: '56px' }}>
            Avalia carango
            <i className='fas fa-star ml-3'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
