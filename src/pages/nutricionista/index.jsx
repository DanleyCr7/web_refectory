import React, { useState, useEffect } from 'react';

import {NutriTable} from '../../components/NutriTable';
import CountMeal from '../../components/countMeal';
import api from '../../services/api';

const Main = _ => {
  const [nutricionistas, setNutris] = useState([]);

  const apiData = async _ => {
    try {
      const resp = await api.get('/nutricionistas');
      setNutris(resp.data);
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

        <NutriTable
          nutricionistas={nutricionistas}
          apiData={apiData}
          title='Nutricionistas'
        />

      </main>
      <CountMeal />
    </>
  );
};

export default Main;