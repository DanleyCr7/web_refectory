import React, { useState, useEffect } from 'react';
import MinhasReservasTable from '../../components/MinhasReservasTable';
import api from '../../services/api';

const Main = _ => {
  const [reservations, setReservations] = useState([]);

  const user = JSON.parse(localStorage.getItem('@ifpi/user'));

  const apiData = async _ => {
    try {
      const resp = await api.get(`/reservations/${user._id}`);
      setReservations(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(reservations);
  console.log(user);

  useEffect(() => {
    apiData();
  }, [])

  return (
    <main style={{ flexGrow: 1, padding: '15px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        minHeight: '64px',
      }}
      />
      <MinhasReservasTable title="Minhas Reservas" data={reservations} apiData={apiData} />
    </main>
  );
};

export default Main;