import React, { useState, useEffect } from 'react';
import CountMeal from '../../components/countMeal';
import { ClassTable } from '../../components/ClassTable';
import api from '../../services/api';

const Main = _ => {
  const [classes, setClasses] = useState([]);

  const apiData = async _ => {
    try {
      const resp = await api.get('/class');
      setClasses(resp.data);
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

        <ClassTable
          classes={classes}
          apiData={apiData}
          title='Turmas'
        />

      </main>
      <CountMeal />
    </>
  );
};

export default Main;