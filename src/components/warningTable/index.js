import React, {useState} from 'react'
import MaterialTable from 'material-table'

import settingsDefaultText from '../../config/settingsText'
export const WarningTable =_=>{
    const [state, setState] = useState({
        collumns:[
            {title: 'Professor', field: 'teacher'},
            {title: 'Motivo', field: 'warning'},
            {title: 'Turma', field: 'class'},
            {title: 'Quantidade', field: 'quantidy'},
            {title: 'Turno', field: 'bout'},
            {title: 'Ano', field: 'year' }
        ],
        data:[
            {teacher: 'Danrley', warning: 'Os alunos estão com fome', class: 'Informatica', quantidy: 40, bout: 'Manhã', year:'2' }
        ]
    })
    const onRowDelete =_=>{
        alert('teste')
    }
    
    return(
        <MaterialTable
          title='Reserva de refeição'
          columns={state.collumns}
          data={state.data}
          editable={{
              onRowDelete: onRowDelete, 
          }}
          actions={[
            {
              icon: 'check',
              tooltip: 'Aceitar',
              onClick: (event, rowData) => {
                // Do save operation
              }
            }
          ]}
          localization={settingsDefaultText}
          options={{
            sorting:false,
            pageSize:10,
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

export default WarningTable;