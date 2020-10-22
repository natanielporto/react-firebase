import React from 'react';
import { Link } from 'react-router-dom';

const Cars = (props) => {
  return (
    <div
      key={props.id}
      className='card col-2 mx-4 my-3'
      style={{ width: '18rem', boxShadow: '2px 2px 2px 2px black' }}
    >
      <img
        className='card-img-top pt-3'
        src={props.foto}
        alt='Foto de um carro.'
        style={{ outline: '1px black' }}
      />
      <div
        style={{ fontSize: '24px' }}
        className='my-2 d-flex justify-content-around'
      >
        <span>AVALIAÇÃO:</span>
        <span>
          <i className='fas fa-star'></i>
          <i className='fas fa-star'></i>
          <i className='fas fa-star'></i>
          <i className='fas fa-star-half-alt'></i>
          <i className='far fa-star'></i>
        </span>
      </div>
      <div className='card-body text-center pt-0'>
        <h3 className='card-title' style={{ fontWeight: 700 }}>
          {props.marca} {props.modelo}
        </h3>
        <div>
          <h6>Marchas: {props.marchas}</h6>
          <h6>Motor: {props.motor}</h6>
          <h6>Ano: {props.ano}</h6>
        </div>
        <Link to={`/vote/${props.id}`} className='btn btn-block btn-info'>
          Avaliar
        </Link>
      </div>
    </div>
  );
};

export default Cars;
