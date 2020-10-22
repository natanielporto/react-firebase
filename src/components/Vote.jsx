import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { db } from '../firebase';

const Vote = () => {
  const { id } = useParams();

  const [carro, setCarro] = useState({});
  const [estrelas, setEstrelas] = useState([]);
  const [votou, setVotou] = useState(false);
  const [aviso, setAviso] = useState('');

  const { register, handleSubmit, errors } = useForm();

  // BUSCA TODOS OS CARROS
  const getCarro = async (id) => {
    const doc = await db.collection('carros').doc(id).get();
    if (doc.exists) {
      setCarro({ id: doc.id, ...doc.data() });
    } else {
      console.log('Erro...');
    }
  };

  // BUSCA AS NOTAS
  const getNota = (id) => {
    db.collection('carros')
      .doc(id)
      .collection('nota')
      .onSnapshot((dados) => {
        const docs = [];
        dados.forEach((nota) => {
          docs.push({ ...nota.data(), id: nota.id });
        });
        const contEstrelas = docs
          .map((el) => Number(el.nota))
          .reduce(function (values, value) {
            return values + value;
          }, 0);
        setEstrelas(
          contEstrelas > 0 ? (contEstrelas / docs.length).toFixed(2) : 0
        );
      });
  };

  useEffect(() => {
    getCarro(id);
    getNota(id);
  }, [id]);

  // CONFERE O VOTO
  // const getVoto = (email) => {
  //   db.collection('carros')
  //     .doc(id)
  //     .collection('nota')
  //     .onSnapshot((dados) => {
  //       const docs = [];
  //       dados.forEach((nota) => {
  //         docs.push({ ...nota.data(), id: nota.id });
  //       });
  //       console.log(docs);
  //       const vote =
  //         docs.map((el) => el.email).filter((el) => el === email).length > 0;
  //       setVotou(vote);
  //       console.log('vote dentro', vote);
  //       console.log('votou dentro', votou);
  //     });
  // };

  const gravaNota = (data, e) => {
    const { email } = data;
    const docs = [];
    db.collection('carros')
      .doc(id)
      .collection('nota')
      .onSnapshot((dados) => {
        dados.forEach((nota) => {
          docs.push(nota.data());
        });
        const votou = docs.map((el) => el.email).filter((el) => el === email)
          .length;

        if (votou > 0) {
          setAviso('Você só pode votar uma vez em cada veículo.');
        } else {
          try {
            db.collection('carros').doc(id).collection('nota').add(data);
            setAviso('Avaliação registrada com sucesso');
          } catch (erro) {
            setAviso('Erro: ' + erro);
          }
          tempoAviso();

          e.target.reset();
        }
      });
  };

  const tempoAviso = () => {
    setTimeout(() => {
      setAviso('');
    }, 5000);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-6 mt-2'>
          <div className='card'>
            <img
              src={carro.foto}
              className='card-img-top img-fluid'
              alt='Imagem de um carro'
            />
            <div className='card-body d-flex justify-content-around'>
              <div>
                <h4 className='card-title'>
                  {carro.marca} {carro.modelo}
                </h4>
                <p className='card-text'>Motor: {carro.motor}</p>
                <p className='card-text'>Marchas: {carro.marchas}</p>
                <p className='card-text'>Ano: {carro.ano}</p>
              </div>
              <div>
                <h2>
                  AVALIAÇÃO: {estrelas} e {votou ? 'oi' : 'olá'}
                </h2>
                <div>
                  {estrelas === 0 ? 'Este carro ainda não foi avaliado.' : ''}
                </div>
                <div className='text-primary'>
                  <i className='fas fa-star fa-2x'></i>
                  <i className='fas fa-star fa-2x'></i>
                  <i className='fas fa-star fa-2x'></i>
                  <i className='fas fa-star fa-2x'></i>
                  <i className='fas fa-star fa-2x'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-6 mt-2'>
          <p className='btn btn-danger btn-lg btn-block'>
            VOCÊ TEM UM? DEIXE A SUA NOTA.
          </p>
          <div className='card'>
            <div className='card-body'>
              <p className='card-text'>
                <strong>
                  Notas de 1 a 5, com intervalos de 0.5. Ex: 5; 4,5
                </strong>
              </p>
              <form onSubmit={handleSubmit(gravaNota)}>
                <div className='input-group mt-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='far fa-user'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Nome Completo'
                    name='nome'
                    ref={register({ required: true })}
                  />
                </div>
                <div className='input-group mt-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-at'></i>
                    </span>
                  </div>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='E-mail para contato'
                    name='email'
                    ref={register({ required: true })}
                  />
                </div>
                <div className='input-group mt-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-star'></i>
                    </span>
                  </div>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Deixe a sua nota'
                    name='nota'
                    ref={register({ required: true, min: 0, max: 5 })}
                  />
                </div>

                <div
                  className={
                    (errors.nome || errors.email || errors.nota) &&
                    'alert alert-danger mt-3'
                  }
                >
                  {errors.nota && (
                    <span>
                      Informe quantas estrelas merece este veículo: mínimo 0,
                      máximo 5.
                    </span>
                  )}

                  {(errors.nome || errors.email) && (
                    <span>Por favor, preencha todos os campos.</span>
                  )}
                </div>

                <Link to={'/'} className='btn btn-danger float-right mt-3'>
                  Retornar
                </Link>

                <input
                  type='submit'
                  className='btn btn-success float-left mt-3'
                  value='Enviar Nota'
                />
              </form>
            </div>
          </div>

          <div className={aviso && 'alert alert-danger mt-3'}>
            {aviso && <span>{aviso}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
