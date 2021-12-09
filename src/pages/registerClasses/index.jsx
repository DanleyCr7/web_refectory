import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import { makeStyles } from '@material-ui/core';
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
export default function RegisterClasses() {
  const classes = useStyles();
  const [cursoId, setCursoId] = useState('');
  const [courses, setCourses] = useState([]);

  const register = async (event) => {
    event.preventDefault()
    let data = event.target;

    console.log({
      course: cursoId,
      shift: data?.shift?.value,
      year: data?.year?.value,
    })
    await api.post('/class', {
      course: cursoId,
      shift: data?.shift?.value,
      year: data?.year?.value,
    }).then(resp => {
      alert('Turmas cadastrada com sucesso');
      window.location.reload();
    }).catch(error => {
      alert('Ops, aconteceu algum erro no cadastro!');
    })
  }

  const handleChange = (event) => {
    setCursoId(event.target.value);
  };

  useEffect(() => {
    api.get('/courses')
      .then((resp) => {
        setCourses(resp.data)
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

  return (

    <form onSubmit={register}>
      <Grid className={classes.margin} xs={12} container>
        <Grid xs={12} sm={12}>
          <Typography variant="h6">
            Cadastrar turma
          </Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <FormControl style={{ minWidth: '80%' }}>
            <InputLabel id="demo-simple-select-autowidth-label">Curso</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={cursoId}
              onChange={handleChange}
              autoWidth
              required
              label="Curso"
            >
              {
                courses.map((item, index) => (
                  <MenuItem value={item._id}>{item?.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Turno</FormLabel>
            <RadioGroup
              aria-label="Turno"
              defaultValue="matutino"
              name="shift"
              row
              required
            >
              <FormControlLabel value="matutino" control={<Radio />} label="Matutino" />
              <FormControlLabel value="vespertino" control={<Radio />} label="Vespertino" />
              <FormControlLabel value="noturno" control={<Radio />} label="Noturno" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12}>
          <TextField
            name="year"
            label="Ano"
            className={classes.textField}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" className={classes.button} >Cadastrar turma</Button>
        </Grid>
      </Grid>
    </form>
  );
}