import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';

const TableLack =_=>{
    const [state, setState] = useState({
        columns:[
            {title: 'Aluno', field: 'NOME'},
            {title: 'Motivo', field: 'reason'},
            {title: 'Matricula', field: 'MATRICULA'},
            {title: 'Turma', field: 'CURSO'},
            {title: 'Turno', field: 'TURNO'},
            {title: 'Ano', field: 'PERIODO'},
            // {title: 'Faltas', field:'lack'},
        ],
        data:[
        ]
    })
    
    useEffect(()=>{
        api.get('/students/found').then(resp=>{
            console.log(resp.data)
            setState({...state, data: resp.data})
        })
    }, [])

    return(
        <MaterialTable
           title="Alunos que não compareceram"
           columns= {state.columns}
           data={state.data}    
           options={{
               sorting: false,
               pageSize: 10,
               actionsColumnIndex: -1,
               headerStyle:{
                   backgroundColor: '#2FA23B',
                   color: '#fff',
                   fontSize: '1rem',
                   zIndex: 8,
               }
           }} 
        />
    )
}

export default TableLack;