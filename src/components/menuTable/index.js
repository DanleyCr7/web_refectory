import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api';
import settingsText from '../../config/settingsText';

const MenuTable = _ => {
  const apiGetData = async _ => {
    try {
      const resp = await api.get('/menu');
      const data = resp.data;
      setState({ ...state, data});
    } catch(err) {
      console.log(err);
    }
  };

  const MenuTextField = ({ props, label, onChange }) => (
    <TextField
      id='filled-multiline-flexible'
      label={label}
      multiline
      rows='4'
      value={props.value}
      onChange={onChange(props)}
      margin='normal'
      variant='filled'
    />
  );

  const [state, setState] = useState({
    columns: [
      { title: 'Título', field: 'title',
        editComponent: props => (
          <MenuTextField 
            props={props} 
            label='Título' 
            onChange={handleTitle}  
          />
        ) 
      },
      { title: 'Descrição', field: 'description',
        editComponent: props => ( 
          <MenuTextField 
            props={props} 
            label='Descrição' 
            onChange={handleDescrip}  
          />
        )
      },
      { 
        title: 'Dia da Semana', 
        field: 'day', 
        lookup: { 0 : 'Segunda', 1: 'Terça', 2: 'Quarta', 3: 'Quinta', 4: 'Sexta' },
      },
      {
        title: 'Refeição',
        field: 'meal',
        lookup: { 0: 'Almoço', 1: 'Jantar' },
      },
    ],
    data: [],
  });

  const handleTitle = props => event => {
    const data = {...props.rowData};
    data.title = event.target.value;
    props.onRowDataChange(data);
  };

  const handleDescrip = props => event => {
    const data = {...props.rowData};
    data.description = event.target.value;
    props.onRowDataChange(data);
  };

  const rowAdd = async newData => {
    try {
      await api.post('/menu', newData)
      .then(resp => {
        const data = [...state.data];
        data.push(newData);
        apiGetData();
        console.log(newData);
      })
    } catch(err) {
      console.log(err);
    }
  };

  const rowUpdate = async (newData, oldData) => { 
    try {
      await api.put(`/menu/${newData.day}/${newData.meal}`, newData)
      .then(resp => {
        const data = [...state.data];
        data[data.indexOf(oldData)] = newData;
        setState({ ...state, data });
      })
    } catch(err) {
      console.log(err);
    }
  };
  
  const rowDelete = async oldData => {
    try {
      await api.delete(`/menu/${oldData._id}`)
      .then(resp => {
        const data = [...state.data];
        data.splice(data.indexOf(oldData), 1);
        setState({ ...state, data });
      })
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(_ => { apiGetData() }, []);
  
  return (
    <MaterialTable
      title='Cardápio Refeitório'
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: rowAdd,
        onRowUpdate: rowUpdate,
        onRowDelete: rowDelete,
      }}
      localization={settingsText}
      options={{
        sorting: false,
        actionsColumnIndex: -1,
        pageSize: 10,
        headerStyle: {
          backgroundColor: '#2FA23B',
          color: '#eee',
          fontSize: '1em',
        },
      }}
    />
  );
}
    
export default MenuTable;