import React, { useState, useEffect } from 'react';
import CountMeal from '../../components/countMeal';
import { ClassTableAdmin } from '../../components/ClassTableAdmin';
import api from '../../services/api';

const Main = _ => {
  const [classes, setClasses] = useState([]);
  const user = JSON.parse(localStorage.getItem('@ifpi/user'));

  const apiData = async _ => {
    try {
      const resp = await api.get('/class');
      setClasses(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

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
          padding: '0px 0px',
          minHeight: '64px',
        }}
        />
        <ClassTableAdmin
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