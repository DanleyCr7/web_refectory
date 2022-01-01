import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Search from "@material-ui/icons/Search";

import DatePickerFilter from '../../components/date'

const DatatablePage = () => {
  const [meal, setMeal] = useState('');
  const data = {
    columns: [
      {
        label: 'Nome',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Falta',
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
        qnt: 1,
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
        <DatePickerFilter label="Inico"/>
        <DatePickerFilter label="Final"/>
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