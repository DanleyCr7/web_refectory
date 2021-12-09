import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import api from '../../services/api';

const TableLack = _ => {
  const [state, setState] = useState({
    columns: [
      { title: 'Aluno', field: 'id_student.name' },
      { title: 'Matricula', field: 'id_student.code' },
      { title: 'Bloqueios', field: 'id_student.countBloqued' },
    ],
    data: [
    ]
  })

  useEffect(() => {
    api.get('/lacks').then(resp => {
      console.log(resp.data);
      setState({ ...state, data: resp.data })
    })
  }, [])

  return (
    <MaterialTable
      title="Alunos que não compareceram"
      columns={state.columns}
      data={state.data}
      options={{
        sorting: false,
        pageSize: 5,
        actionsColumnIndex: -1,
        headerStyle: {
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