import React, { useEffect, useState } from 'react';
import { Student } from '../students';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../images/logo.png';
import api from '../../services/api';
import Snackbar from '../../components/snackbar';
var QRCode = require('qrcode.react');
// custom components

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
    backgroundPosition: 'center 12%',
  },
  qrcode: {
    display: "flex",
    flexDirection: 'column',
    paddingTop: '4%',
    },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typografy: {
    marginTop: 12,
  }
}));

const Check = _ => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState('');
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);  
  const [qrcode, setQrcode] = useState(false);
  const [pathCode, setPathCode] = useState('esperando')
  const [student, setStudent] = useState({
    name: '',
    urlImage: '',
  })
  const apiData = _ => {
    api.get(`/students/${value}`)
      .then(resp => {
        setData(resp.data);
        // here is better snackabar 
        setHelperText('Boa refeição');
      })
      // it's no return error at backend
      .catch(_ => setHelperText('Eita'));
  };
  // useEffect(()=>{
  //   api.get('/qrcode').then(response=>{
  //     // consoloel
  //     setPathCode(response.data)
  //   }).catch(error=>{
  //     console.log(error)
  //   })
  // }, [pathCode])

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     api.get('/qrcode').then(response=>{
  //       // consoloel
  //       setStudent(response.data)
  //     }).catch(error=>{
  //       console.log(error)
  //     })
  //   })
  // }, [student])
  const handleChange = event => {
    setValue(event.target.value);
    setHelperText('')
    console.log(event.target.value);
  };

  const handleClick = event => {  
    event.preventDefault();
    if (err) {
      setValue('');
      setHelperText('Erro na matrícula')
    } else {
      // apiData();
      setOpen(true);
    }
  };

  const checkNumber = value => {
    if (value.trim() !== '') {
      const rule = /^[0-9]+$/;
      if (value.match(rule)) {
        setErr(false);
      }
      else {
        setErr(true);
      }
    }
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid
        justifyContent="center"
        alignItems="center"
        item xs={false} sm={4} md={7} className={qrcode ? classes.qrcode : classes.image}>
        {qrcode&& <Student student={student}/>}
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}> 
          <QRCode renderAs='svg' value='teste' size={280} />
          <Typography className={classes.typografy} component='h1' variant='h5'>
            Entrar no Refeitório
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='matricula'
              label='Matricula'
              name='matricula'
              autoComplete='matricula'
              autoFocus
              value={value}
              onChange={handleChange}
              onKeyDown={_ => checkNumber(value)}
              helperText={helperText}
              error={err}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleClick}
            >
              Confirmar Presença
            </Button>
            {!!open &&
              <Snackbar open={open} setOpen={setOpen} variant={'success'} msg={'Presença confirmada'} />
            }
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Check;