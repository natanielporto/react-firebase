import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className='App'>
        <div className='mb-0 py-4 text-darkorange d-flex justify-content-around align-items-center'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h1 style={{ fontWeight: 700, fontSize: '56px' }}>
              4 RODAS 5 ESTRELAS
            </h1>
          </Link>
          <Link to='/search' style={{ textDecoration: 'none' }}>
            <h4
              style={{
                borderRadius: '8px',
                border: '4px solid darkorange',
              }}
              className='p-2'
            >
              <i className='fas fa-search mr-2'></i> Busca <br /> por carro
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
