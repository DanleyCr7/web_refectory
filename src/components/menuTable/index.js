import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import { format, addDays } from 'date-fns'
import api from '../../services/api';
import settingsText from '../../config/settingsText';
import Snackbar from '../snackbar';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { date, month, year } from './date'

const MenuTable = _ => {
  const [helperText, setHelperText] = useState({
    resp: '',
    message: ''
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2AB083',
      },
      secondary: {
        main: '#333',
      },
    },
  });

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
        title: 'hora da Reserva', field: 'hourReserve',
        editComponent: props => (
          <TimeTextField
            props={props}
            label='hourReserve'
            field='time'
            onChange={handlehourReserve}
          />
        ),
        validate: rowData => Boolean(rowData.hourReserve),
      },

      {
        title: 'hora da confirmação', field: 'hourConfirmReserve',
        editComponent: props => (
          <TimeTextField
            props={props}
            label='hourConfirmReserve'
            onChange={handlehourConfirmReserve}
          />
        ),
        validate: rowData => Boolean(rowData.hourConfirmReserve),
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
      setOpen(true);
      setHelperText({ message: 'Ops, houve algum erro :(', resp: 'error' });
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

  const materialDateInput = ``;

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

  const TimeTextField = ({ props, label, onChange }) => (
    <TextField
      id="time"
      label={label}
      type="time"
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

  const handlehourReserve = props => event => {
    const data = { ...props.rowData };
    data.hourReserve = event.target.value;
    props.onRowDataChange(data);
  };

  const handlehourConfirmReserve = props => event => {
    const data = { ...props.rowData };
    data.hourConfirmReserve = event.target.value;
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
          setOpen(true);
          setHelperText({ message: 'Cardápio criado com sucesso', resp: 'success' });
          apiGetData()
        }).catch(error => {
          setOpen(true);
          setHelperText({ message: 'Ops, já existe um cardápio para essa data', resp: 'error' });
        })
    } catch (err) {
      setOpen(true)
      setHelperText({ message: 'Ops, houve algum erro :(', resp: 'error' });
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
        hourConfirmReserve: newData.hourConfirmReserve,
        hourReserve: newData.hourReserve,
      })
        .then(resp => {
          const data = [...state.data];
          data[data.indexOf(oldData)] = newData;
          setState({ ...state, data });
        })
    } catch (err) {
      setOpen(true);
      setHelperText({ message: 'Ops, houve algum erro :(', resp: 'error' });
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
      <Snackbar open={open} setOpen={setOpen} variant={helperText.resp} msg={helperText.message} />
      <ThemeProvider theme={theme}>
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
            selection: true,
            sorting: false,
            actionsColumnIndex: -1,
            pageSize: 5,
            headerStyle: {
              backgroundColor: '#2FA23B',
              color: '#eee',
              fontSize: '1em',
              zIndex: 8
            },
          }}
        />
      </ThemeProvider>
    </>
  );
}

export default MenuTable;