import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Cars from './Cars';

const AllCars = () => {
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
    <div className='row bg-secondary justify-content-center m-0'>
      {carros.map((el) => (
        <Cars
          key={el.id}
          id={el.id}
          foto={el.foto}
          modelo={el.modelo}
          marcha={el.marcha}
          motor={el.motor}
          ano={el.ano}
        />
      ))}
    </div>
  );
};

export default AllCars;
