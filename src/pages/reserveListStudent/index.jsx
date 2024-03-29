import React, { useState, useEffect } from 'react';

import ReservaTableStudent from '../../components/reservaTableStudent';
import CountMeal from '../../components/countMeal';
import api from '../../services/api';

const Main = _ => {
  const [studentsReserve, setStudentsReserve] = useState([]);

  const apiData = async () => {
    api.get('/reserves').then(resp => {
      console.log(resp.data)
      setStudentsReserve(resp.data)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    apiData();
  }, [])

  return (
    <>
      <main style={{ flexGrow: 1, padding: '15px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
        }}
        />
        <ReservaTableStudent
          students={studentsReserve}
          title='Reserva dos alunos'
        />
      </main>
      <CountMeal />
    </>
  );
};

export default Main;