import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { colors, makeStyles } from '@material-ui/core';
import api from '../../services/api';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core';

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
  const [idClass, setIdClass] = useState('');
  const [turmas, setTurmas] = useState([]);

  const register = async (event)=>{
    event.preventDefault()
    let data = event.target;
    
    await api.post('/students',{
        name: data?.name?.value,
        email: data?.email?.value,
        cpf: data?.cpf?.value,
        phone: data?.phone?.value,
        code: data?.code?.value,
        id: idClass,
    }).then(resp=>{
        alert('Aluno cadastrado com sucesso');
        window.location.reload();
    })
    .catch(error=>{
         alert('Ops, aconteceu algum erro no cadastro!');
    })
    }

  useEffect(()=>{
    api.get('/class')
    .then(resp=>{
        setTurmas(resp.data);
  })
    .catch(error=>{
        console.log(error);
    })
  }, []);

  const handleChange = (event) => {
    setIdClass(event.target.value);
  };

  return (  
    <form onSubmit={register}>
    <Grid className={classes.margin} xs={12} container>
     <Grid  xs={12} sm={12}>
      <Typography variant="h6">
        Cadastrar aluno
      </Typography>
      </Grid>
       <Grid  xs={12} sm={6}>
          <TextField
            name="name"
            label="Nome do aluno"
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="email"
            className={classes.textField}
            />
        </Grid>
    
        <Grid item xs={12} sm={6}>
          <TextField
          id="cpf"
          name="cpf"
          label="CPF"
          className={classes.textField}
          
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="phone"
            className={classes.textField}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Matrícula"
            name="code"
            label="Matrícula"
            className={classes.textField} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl style={{minWidth: '80%'}}>
            <InputLabel id="demo-simple-select-autowidth-label">Turma</InputLabel>
            <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={idClass}
            onChange={handleChange}
            autoWidth
            label="Turma"
            >
            {
                turmas.map((item, index)=>(
                    <MenuItem value={item._id}>{item?.course?.name} ({item.year} - {item.shift})</MenuItem>
                ))
            }
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
            <Button type="submit" className={classes.button} >Cadastrar aluno</Button>
        </Grid> 
      </Grid>
      </form>
  );
}