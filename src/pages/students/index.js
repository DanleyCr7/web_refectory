import React, { useState, useEffect } from 'react';

import { StudentsTable } from '../../components/StudentsTable';
import CountMeal from '../../components/countMeal';
import api from '../../services/api';

const Main = _ => {
  const [students, setStudents] = useState([]);

  const apiData = async _ => {
    try {
      const resp = await api.get('/students');
      setStudents(resp.data);
      console.log(resp.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(_ => {
    apiData();
  }, []);

  return (

    <>
      <main style={{ flexGrow: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0px 0px',
          minHeight: '64px',
        }}
        />


        <StudentsTable
          students={students}
          apiData={apiData}
          title='Alunos'
        />

      </main>
      <CountMeal />
    </>
  );
};

export default Main;