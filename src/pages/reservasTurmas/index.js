import React, { useEffect, useState } from 'react';

import { ClassReservationTable } from '../../components/ClassReservationTable';

import api from '../../services/api';

const ReservasTurmas = _ => {
  const [classes, setClasses] = useState([]);

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
      <main style={{ flexGrow: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
        }}
        />
        <ClassReservationTable title="Agendar Turmas" classes={classes} />
      </main>
    </>
  );
};

export default ReservasTurmas;