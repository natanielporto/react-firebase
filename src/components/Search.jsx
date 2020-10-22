import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const holder = ['marca', 'modelo', 'ano', 'marchas'];

const Search = () => {
  const [carros, setCarros] = useState([]);
  const [busca, setBusca] = useState([]);

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

  const handleSearch = (e) => {
    const { id } = e.target;
    const value = document.getElementById(`form ${id}`).value;
    let filtered;
    switch (id) {
      case 'marca':
        filtered = carros.filter((el) => el.marca === value);
        filtered.length > 0 ? setBusca(filtered) : setBusca('error');
        break;
      case 'modelo':
        filtered = carros.filter((el) => el.modelo === value);
        if (filtered.length > 0) {
          setBusca(filtered);
        }
        break;
      case 'ano':
        filtered = carros.filter((el) => el.ano === value);
        if (filtered.length > 0) {
          setBusca(filtered);
        }
        break;
      default:
        filtered = carros.filter((el) => el.marchas === value);
        if (filtered.length > 0) {
          setBusca(filtered);
        }
        break;
    }
  };

  return (
    <>
      <div className='d-flex justify-content-around'>
        <div className='row'>
          {holder.map((el) => (
            <div className='input-group mb-3 col-3' key={el}>
              <input
                id={`form ${el}`}
                type='text'
                className='form-control'
                placeholder={`Procurar por ${el}`}
              />
              <div className='input-group-append'>
                <button
                  id={el}
                  className='btn btn-primary'
                  type='button'
                  onClick={handleSearch}
                >
                  Procurar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {busca.length === 0 && (
        <h2 className='my-5 text-center text-primary'>
          <p>
            <strong>Preencha um dos campos acima para</strong>
          </p>
          <p>
            <strong>procurar no nosso banco de dados.</strong>
          </p>
        </h2>
      )}
      {busca === 'error' && (
        <h2 className='my-5 text-center text-primary'>
          <p>
            <strong>Nenhum resultado encontrado.</strong>
          </p>
          <p>
            <strong>Preencha um dos campos acima para</strong>
          </p>
          <p>
            <strong>procurar no nosso banco de dados.</strong>
          </p>
        </h2>
      )}
      {busca.length > 0 && busca !== 'error' && (
        <div className='row bg-secondary justify-content-center m-0'>
          {busca.map((el) => (
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
                <a
                  href={`/vote/${el.id}`}
                  className='btn btn-primary btn-block'
                >
                  Avaliar
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
