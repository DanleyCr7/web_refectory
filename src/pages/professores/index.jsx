import React, { useState, useEffect } from 'react';

import { TeachersTable } from '../../components/TeachersTable';
import CountMeal from '../../components/countMeal';
import api from '../../services/api';

const Main = _ => {
  const [teachers, setTeachers] = useState([]);

  const apiData = async _ => {
    try {
      const resp = await api.get('/teachers');
      setTeachers(resp.data);
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
      <main style={{ flexGrow: 1, padding: '15px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
        }}
        />

        <TeachersTable
          teachers={teachers}
          apiData={apiData}
          title='Professores'
        />

      </main>
      <CountMeal />
    </>
  );
};

export default Main;