import React, { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import api from '../../services/api';
import { useParams } from 'react-router';
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

export default function Confirm() {
  const [data, setData] = useState("");
  const { id } = useParams();
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem('@ifpi/user'));

  const register = async (event) => {
    event.preventDefault()
    const class_id = id;
    const teacher_id = user._id;

    console.log(class_id, teacher_id, data);

    await api.post('/class/reservation', {
      class_id, teacher_id, data
    }).then(resp => {
      alert(resp?.data?.message);
      console.log(resp?.data?.message)
      // window.location.href = "/reservasTurmas";
    }).catch(error => {
      // alert('Ops, aconteceu algum erro no agendamento!');
    })
  }

  // const register = async (event) => {
  //   event.preventDefault()
  //   let data = event.target;

  //   console.log({
  //     name: data?.name?.value,
  //   })
  //   await api.post('/courses', {
  //     name: data?.name?.value,
  //   }).then(resp => {
  //     alert('Curso cadastrado com sucesso');
  //     window.location.reload();
  //   }).catch(error => {
  //     alert('Ops, aconteceu algum erro no cadastro!');
  //   })
  // }
  return (

    <form onSubmit={register}>
      <Grid className={classes.margin} xs={12} container>
        <Grid xs={12} sm={12}>
          <Typography variant="h6">
            Confirma angendamento
          </Typography>
        </Grid>

        <TextField
          id="date"
          label="Data"
          type="date"
          InputLabelProps={{
            shrink: true,
            required: true
          }}
          onChange={(e) => setData(e.target.value)}
        />

        <Grid item xs={12} sm={12}>
          <Button type="submit" disabled={data ? false : true} className={classes.button} >Confirma</Button>
        </Grid>
      </Grid>
    </form >
  );
}