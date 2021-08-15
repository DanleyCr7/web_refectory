import React, {useEffect, useState} from 'react';
import Badge from '@material-ui/core/Badge';
import WarningTable from '../../components/warningTable';
import api from '../../services/api';
const Warning = _ => {
    const [requested, requestedSet]= useState([
    ])
    const [accepted, acceptedSet]= useState([
        {teacher: 'Danrley', warning: 'Os alunos estão com fome', class: 'Informatica', quantidy: 40, bout: 'Manhã', year:'2', date: '24/07/2021' }
    ]) 

   
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