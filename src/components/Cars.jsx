import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { db } from '../firebase';

const Cars = () => {
  const [carros, setCarros] = useState([]);

  const getCarros = async () => {
    db.collection('carros')
      .orderBy('marca')
      .onSnapshot((dados) => {
        const docs = [];
        dados.forEach((carro) => {
          docs.push({ ...carro.data(), id: carro.id });
        });
        setCarros(docs);
      });
  };

  useEffect(() => {
    getCarros();
  }, []);

  return (
    <div className='row bg-secondary justify-content-center'>
      {carros.map((el) => (
        <div
          key={el.id}
          className='card col-2 mx-4 my-3'
          style={{ width: '18rem', boxShadow: '2px 2px 2px 2px black' }}
        >
          <img
            className='card-img-top pt-3'
            src={el.foto}
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
              {el.marca} {el.modelo}
            </h3>
            <div>
              <h6>Marchas: {el.marchas}</h6>
              <h6>Motor: {el.motor}</h6>
              <h6>Ano: {el.ano}</h6>
            </div>
            <a href='#' className='btn btn-primary btn-block'>
              Avaliar
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cars;
