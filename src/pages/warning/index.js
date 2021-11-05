import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import WarningTable from '../../components/warningTable';

const Warning = _ => {
    const [reservations, setReservations] = useState([]);

    const apiData = async _ => {
        try {
            const resp = await api.get('/reservations');
            setReservations(resp.data);
        } catch (err) {
            console.log(err);
        }
    };

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
            <WarningTable title="Reservas dos professores" data={reservations} apiData={apiData} />
            {/* <WarningTable title="Reservas aceitas" data={accepted} /> */}
        </main>
    );
}
export default Warning;