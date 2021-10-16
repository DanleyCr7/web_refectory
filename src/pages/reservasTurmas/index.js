import React from 'react';

import ReservasTurmasTable from '../../components/reservasTurmas';

const ReservasTurmas = _ => {
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
        <ReservasTurmasTable />
      </main>
    </>
  );
};

export default ReservasTurmas;