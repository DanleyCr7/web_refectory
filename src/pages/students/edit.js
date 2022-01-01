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
    api.get(`/students/${id}`).then((data) => {
      console.log(data.data);
      const result = data.data;
      setName(result.name);
      setEmail(result.email);
      setCpf(result.cpf);
      setPhone(result.phone);
    });
  }, [])

  const submit = async (event) => {
    event.preventDefault()

    let data = event.target;

    api.put(`/students/${id}`, {
      name: data?.name?.value,
      email: data?.email?.value,
      password: data?.password?.value,
      cpf: data?.cpf?.value,
      phone: data?.phone?.value,
    }).then(resp => {
      history.push('/');
    });
  }

  return (
    <form onSubmit={submit}>
      <Grid className={classes.margin} xs={12} container>
        <Grid xs={12} sm={12}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Atualizar aluno
          </Typography>
        </Grid>

        <Grid xs={12} sm={6}>
          <TextField
            name="name"
            label="Nome do aluno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="cpf"
            name="cpf"
            label="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button type="submit" className={classes.button} >Atualizar aluno</Button>
        </Grid>
      </Grid>
    </form>
  );
}