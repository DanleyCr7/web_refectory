import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { colors, makeStyles } from '@material-ui/core';
import api from '../../services/api';
const useStyles = makeStyles({
  button: {
    backgroundColor: '#17871d',
    color: '#fff',
    marginTop: 15,

  },
  margin: {
    marginTop: 80,
    paddingLeft: 15
  },

  textField: {
    width: '90%',

  },
});
export default function Register() {
  const classes = useStyles();

  const register = async (event) => {
    event.preventDefault()
    let data = event.target;

    console.log({
      name: data?.name?.value,
      email: data?.email?.value,
      password: data?.password?.value,
      cpf: data?.cpf?.value,
      rg: data?.rg?.value,
      phone: data?.phone?.value,
      state: data?.state?.value,
      city: data?.city?.value,
      address: data?.address?.value,
      number: data?.number?.value,
      birth_date: data?.birth_date?.value,
      cep: data?.cep?.value,
    })

    await api.post('/teachers', {
      name: data?.name?.value,
      email: data?.email?.value,
      password: data?.password?.value,
      cpf: data?.cpf?.value,
      rg: data?.rg?.value,
      phone: data?.phone?.value,
      state: data?.state?.value,
      city: data?.city?.value,
      address: data?.address?.value,
      number: data?.number?.value,
      birth_date: data?.birth_date?.value,
      cep: data?.cep?.value,
    }).then(resp => {
      alert('Professor cadastrado com sucesso');
      window.location.reload();
    }).catch(error => {
      console.log(error);
      alert('ops, ocorreu um erro! verifique os campos ou entre em contato');
    })
  }
  return (

    <form onSubmit={register}>
      <Grid className={classes.margin} xs={12} container>
        <Grid xs={12} sm={12}>
          <Typography variant="h6">
            Cadastrar professor
          </Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            name="name"
            label="Nome do professor"
            required
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="email"
            required
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="password"
            label="Senha"
            required
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="cpf"
            name="cpf"
            required
            label="CPF"
            className={classes.textField}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="zip"
            name="rg"
            label="RG"
            required
            className={classes.textField}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            required
            label="phone"
            className={classes.textField}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Cidade"
            name="city"
            label="Cidade"
            required
            className={classes.textField}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Estado"
            name="state"
            required
            label="Estado"
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" className={classes.button} >Cadastrar professor</Button>
        </Grid>
      </Grid>
    </form>
  );
}