import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import { format, addDays } from 'date-fns'
import api from '../../services/api';
import settingsText from '../../config/settingsText';
import Snackbar from '../snackbar';

import { date, month, year } from './date'

const MenuTable = _ => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    columns: [
      {
        title: 'Título', field: 'title',
        editComponent: props => (
          <MenuTextField
            props={props}
            label='Título'
            onChange={handleTitle}
          />
        ),
        validate: rowData => Boolean(rowData.title),
      },
      {
        title: 'Descrição', field: 'description',
        editComponent: props => (
          <MenuTextField
            props={props}
            label='Descrição'
            onChange={handleDescrip}
          />
        ),
        validate: rowData => Boolean(rowData.description),
      },
      {
        title: 'Dia da Semana',
        field: 'date',
        editComponent: props => (
          <DateTextField
            props={props}
            label='Calendario'
            onChange={handleDate}
          />),
        validate: rowData => Boolean(rowData.date),
      },
      {
        title: 'Refeição',
        field: 'type',
        lookup: { 0: 'Almoço', 1: 'Jantar' },
        validate: rowData => Boolean(rowData.type),

      },
    ],
    data: []
  });

  const apiGetData = async _ => {
    try {
      const resp = await api.get('/menu/all');
      const data = resp.data;
      console.log(data)
      setState({ ...state, data });
    } catch (err) {
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
      defaultValue={materialDateInput} // Todate's Date being used as default
      InputLabelProps={{
        shrink: true,
        required: true
      }}
      onChange={onChange(props)}
    />
  );

  const handleTitle = props => event => {
    const data = { ...props.rowData };
    data.title = event.target.value;
    props.onRowDataChange(data);
  };

  const handleDescrip = props => event => {
    const data = { ...props.rowData };
    data.description = event.target.value;
    props.onRowDataChange(data);
  };
  const handleDate = props => event => {
    const data = { ...props.rowData };
    const formatDate = format(addDays(new Date(event.target.value), 1), 'dd/MM/yyyy')
    data.date = formatDate;
    props.onRowDataChange(data);
  };

  const rowAdd = async newData => {
    try {
      await api.post('/menu', newData)
        .then(resp => {
          console.log(resp.data)
          apiGetData()
        }).catch(error => {
          console.log(error)
        })
    } catch (err) {
      console.log(err);
    }
  };


  const rowUpdate = async (newData, oldData) => {
    try {
      await api.put(`/menu`, {
        id: newData._id,
        title: newData.title,
        description: newData.description,
        date: newData.date,
        type: newData.type,
      })
        .then(resp => {
          const data = [...state.data];
          data[data.indexOf(oldData)] = newData;
          setState({ ...state, data });
        })
    } catch (err) {
      console.log(err);
    }
  };

  const rowDelete = async (oldData) => {
    console.log(oldData._id)
    try {
      await api.delete(`/menu`, { data: { id: oldData._id } })
        .then(resp => {
          console.log(resp)
          const data = [...state.data];
          data.splice(data.indexOf(oldData), 1);
          setState({ ...state, data });
        })
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    apiGetData()
  }, []);

  return (
    <>
      <Snackbar open={open} setOpen={setOpen} variant={'warning'} msg={'Preencha todos os campos'} />
      <MaterialTable
        title='Cardápio Refeitório'
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              if (!newData) {
                // alert('required');
                setOpen(true)
                reject();
              } else {
                rowAdd(newData)
                resolve()
              }
            }),
          onRowUpdate: rowUpdate,
          onRowDelete: rowDelete,
        }}
        style={{ zIndex: 0, }}
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