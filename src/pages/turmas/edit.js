import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import api from '../../services/api';

import { useParams, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  button: {
    backgroundColor: '#17871d',
    color: '#fff',
  },
  margin: {
    marginTop: 80,
    paddingLeft: 15
  },

  textField: {
    width: '90%',
    marginBottom: '20px'
  },
});

export default function Update() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [shift, setShift] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    api.get(`/class/${id}`).then((data) => {
      console.log(data.data);
      const result = data.data;
      setShift(result.shift);
      setYear(result.year);
    });
  }, [])

  const submit = async (event) => {
    event.preventDefault()

    let data = event.target;

    api.put(`/class/${id}`, {
      shift: data?.shift?.value,
      year: data?.year?.value,
    }).then(resp => {
      history.push('/turmas');
    });
  }

  return (
    <form onSubmit={submit}>
      <Grid className={classes.margin} xs={12} container>
        <Grid xs={12} sm={12}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Atualizar turma
          </Typography>
        </Grid>

        <Grid xs={12} sm={6}>
          <TextField
            name="shift"
            label="shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="year"
            label="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button type="submit" className={classes.button} >Atualizar turma</Button>
        </Grid>
      </Grid>
    </form>
  );
}