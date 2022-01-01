import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import api from '../../services/api';

import { useParams } from 'react-router-dom'
import { createBrowserHistory } from 'history';
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
  const history = createBrowserHistory();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    api.get(`/courses/${id}`).then((data) => {
      console.log(data.data);
      const result = data.data;
      setName(result.name);
    });
  }, [])

  const submit = async (event) => {
    event.preventDefault()

    let data = event.target;

    api.put(`/courses/${id}`, {
      name: data?.name?.value,
    }).then(resp => {
      history.push('/cursos');
    });
  }

  return (
    <form onSubmit={submit}>
      <Grid className={classes.margin} xs={12} container>
        <Grid xs={12} sm={12}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Atualizar curso
          </Typography>
        </Grid>

        <Grid xs={12} sm={6}>
          <TextField
            name="name"
            label="Nome do curso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button type="submit" className={classes.button} >Atualizar curso</Button>
        </Grid>
      </Grid>
    </form>
  );
}