import React, {useEffect, useState} from 'react';
import WarningTable from '../../components/warningTable';
const Warning = _ => {
    const [ requested ]= useState([])
    const [ accepted ]= useState([]) 

   
    return (
        <main style={{ flexGrow: 1 }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 8px',
                minHeight: '64px',
            }}
            />
            <WarningTable title="Reservas solicitadas" data={requested} />
            <WarningTable title="Reservas aceitas"  data={accepted}/>
        </main>
    );
}
export default Warning;