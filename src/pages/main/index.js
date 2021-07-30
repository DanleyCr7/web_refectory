import React, { useState, useEffect } from 'react';

import StudentsTable from '../../components/studentsTable';
import CountMeal from '../../components/countMeal';
import api from '../../services/api';

const Main = _ => {
  const [cannotRequiredMeal, setCannot] = useState([]);
  const [canRequiredMeal, setCan] = useState([]);

  const apiData = async _ => {
    try {
      Promise.all([ 
        await api.get('/')
      ]).then(response => {
        console.log(response[0].data);
        setCannot(response[0].data);
        setCan(response[1].data);
      })
    } catch(err) {
      console.log(err); 
    }
  };

  // useEffect(_ => {
  //   apiData();
  // }, []);

  return (
    <>
      <main style={{flexGrow: 1}}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
          }}
        />
        <StudentsTable 
          students={cannotRequiredMeal}
          apiData={apiData} 
          title='Não autorizados ao refeitório' 
        />
        <StudentsTable 
          students={canRequiredMeal} 
          apiData={apiData} 
          title='Autorizados ao refeitório' 
        />
      </main>
      <CountMeal />
    </>
  );
};

export default Main;