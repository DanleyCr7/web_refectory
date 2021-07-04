import React, {useState} from 'react';
import MaterialTable from 'material-table';

const TableLack =_=>{
    const [state, setState] = useState({
        columns:[
            {title: 'Aluno', field: 'student'},
            {title: 'Motivo', field: 'reason'},
            {title: 'Matricula', field: 'registration'},
            {title: 'Turma', field: 'class'},
            {title: 'Turno', field: 'shift'},
            {title: 'Ano', field: 'year'},
            {title: 'Faltas', field:'lack'},
        ],
        data:[
            {student: 'Danrley', reason: 'Queria ir pra casa', registration:'21013528', class: 'Informática', shift: 'tarde', year: '2', lack: 2}
        ]
    })
    
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