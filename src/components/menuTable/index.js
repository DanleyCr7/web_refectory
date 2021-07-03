import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns'
import api from '../../services/api';
import settingsText from '../../config/settingsText';
import Snackbar from '../snackbar';

import {date, month, year} from './date'

const MenuTable = _ => {
  const [message, setMessage]= useState(false);
  const [open, setOpen] = useState(false);
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
      InputLabelProps={{
        required: true
      }}
      value={props.value}
      onChange={onChange(props)}
      margin='normal'
      variant='filled'
    />
  );
  const materialDateInput = `${year}-${month}-${date}`; 
  const DateTextField = ({ props, label, onChange }) => (
    <TextField
    id="date"
    label={label}
    type="date"
    defaultValue={materialDateInput} // Today's Date being used as default
    InputLabelProps={{
      shrink: true,
      required: true
    }}
    onChange={onChange(props)}
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
        ),
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
        editComponent: props => ( 
          <DateTextField 
            props={props} 
            label='Calendario' 
            onChange={handleDate}  
          />)
      },
      {
        title: 'Refeição',
        field: 'meal',
        lookup: { 0: 'Almoço', 1: 'Jantar' },
      },
    ],
    data : [
      {title: 'teste', description: 'Baran', day: '02/07/2021', meal: 0},
    ]
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
  const handleDate = props => event => {
    const data = {...props.rowData};
    const formatDate = format(new Date(event.target.value), 'dd/MM/yyyy')
    data.day = formatDate;
    props.onRowDataChange(data);
  };

  const rowAdd = async newData => {
    try {
      // await api.post('/menu', newData)
      // .then(resp => {
        if(newData.title===undefined||newData.description===undefined){
          setOpen(true);
        }else{
        const data = [...state.data];
        data.push(newData);
        setState({...state, data})
        console.log(newData)
        }
      //   apiGetData();
      //   console.log(newData);
      // })
    } catch(err) {
      console.log(err);
    }
  };
  

  const rowUpdate = async (newData, oldData) => { 
    try {
      // await api.put(`/menu/${newData.day}/${newData.meal}`, newData)
        // .then(resp => {
          const data = [...state.data];
          data[data.indexOf(oldData)] = newData;
          console.log(data)
          setState({ ...state, data });
      // })
    } catch(err) {
      console.log(err);
    }
  };
  
  const rowDelete = async oldData => {
    try {
      // await api.delete(`/menu/${oldData._id}`)
      // .then(resp => {
        const data = [...state.data];
        data.splice(data.indexOf(oldData), 1);
        setState({ ...state, data });
      // })
    } catch(err) {
      console.log(err);
    }
  };
  
  return (
    <>
    <Snackbar open={open} setOpen={setOpen} variant={'warning'} msg={'Preencha todos os campos'}/>
    <MaterialTable
      title='Cardápio Refeitório'
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: rowAdd,
        onRowUpdate: rowUpdate,
        onRowDelete: rowDelete,
      }}
      
      style={{zIndex: 0, }}
      localization={settingsText}
      options={{
        sorting: false,
        actionsColumnIndex: -1,
        pageSize: 10,
        headerStyle: {
          backgroundColor: '#2FA23B',
          color: '#eee',
          fontSize: '1em',
          zIndex: 8
        },

      }}
    />
    </>
  );
}
    
export default MenuTable;