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
       color: '#fff',
      marginTop: 15,

    },
    margin:{
        marginTop: 80,
        paddingLeft: 15
    },
   
    textField:{
      width: '90%',

    },
});
export default function Register() {
  const classes = useStyles();
  
  const register = async (event)=>{
    event.preventDefault()
    let data = event.target;
    
    console.log({
        name: data?.name?.value,
    })
    await api.post('/courses',{
        name: data?.name?.value,
    }).then(resp=>{
        console.log(resp.data)
    })
}
  return (
    
    <form onSubmit={register}>
    <Grid className={classes.margin} xs={12} container>
     <Grid  xs={12} sm={12}>
      <Typography variant="h6">
        Cadastrar curso
      </Typography>
      </Grid>
       <Grid  xs={12} sm={6}>
          <TextField
            name="name"
            label="Curso"
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button type="submit" className={classes.button} >Cadastrar curso</Button>
        </Grid> 
      </Grid>
      </form>
  );
}