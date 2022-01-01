import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Search from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DatatablePage = () => {
  const [meal, setMeal] = useState('');
  const classes = useStyles();
  const data = {
    columns: [
      {
        label: 'Nome',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Refeição',
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Turma',
        field: 'office',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Quant. faltas',
        field: 'age',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Data',
        field: 'date',
        sort: 'asc',
        width: 100
      },
   
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        },
        {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        },{
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        date: '02/01/2022',
        age: '61',
        }
    ]
    };
    
    function handleChange(e) {
        e.preventDefault();
        setMeal(e.target.value);
    }

    return (
      <main style={{ flexGrow: 1, padding: '15px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0',
          minHeight: '64px',
        }}
            />
    <div className='col-12 d-flex justify-content-end m-0 pd-0' >
        <TextField
        id="date"
        label="Inicio"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <TextField
        id="date"
        label="Final"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <div className='col-2'>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Refeição</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={meal}
            label="Refeicao"
            onChange={handleChange}
        >
            <MenuItem value={0}>Almoço</MenuItem>
            <MenuItem value={1}>Jantar</MenuItem>
        </Select>
        </FormControl>
                </div> 
        <div>
        <TextField
        label="Pesquisa.."
        InputProps={{
            endAdornment: (
            <InputAdornment>
                <IconButton>
                <Search />
                </IconButton>
            </InputAdornment>
            )
        }}
        />
    </div>
    </div>
    <MDBDataTable
      striped
      bordered
      small
                data={data}
                searching={false}
            />
      </main>
            
  );
}

export default DatatablePage;