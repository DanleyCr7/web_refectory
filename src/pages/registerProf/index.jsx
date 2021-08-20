import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { colors, makeStyles } from '@material-ui/core';
import api from '../../services/api';
const useStyles = makeStyles({
    button:{
       backgroundColor: '#17871d',
       color: '#fff'
    },
    margin:{
        marginTop: 80
    }
});
export default function Register() {
  const classes = useStyles();
  
  const register = async (event)=>{
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
    await api.post('/teachers',{
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
    }).then(resp=>{
        console.log(resp.data)
    })
}
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Cadastrar professor
      </Typography>
      <form onSubmit={register} styles="width: 100%">
      <Grid container spacing={3}>
        <Grid className={classes.margin} spacing={3} item xs={45}>
          <TextField
            name="name"
            label="Nome do professor"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="password"
            label="Senha"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="cpf" name="cpf" label="CPF"  />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="zip"
            name="rg"
            label="RG"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="phone"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Cidade"
            name="city"
            label="Cidade"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Estado"
            name="state"
            label="Estado"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button type="submit" className={classes.button} >Cadastrar professor</Button>
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
}