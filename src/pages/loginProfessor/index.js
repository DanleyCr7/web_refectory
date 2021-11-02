import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from '../../images/logo.png';
import api from '../../services/api';
import Snackbar from '../../components/snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'linear-gradient(45deg, #388e3c 30%, #1b5e20 90%)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:'linear-gradient(45deg, #388e3c 30%, #1b5e20 90%)',
    color: '#fff'
  },
  image: {
      width: 150,
      height: 150,
  },
  container:{
    background: '#fff',
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [helperText, setHelperText] = useState({
    resp: '',
    message: ''
  });
  const [circular, setCircular] = useState(false)
  const [open, setOpen] = useState(false);  

  function login(e) {
    e.preventDefault();
    setCircular(true)
    const values = e.target;

    const data = {
      email : values.email.value,
      password : values.password.value,
    }
    
    api.post(`/teacher/login`, data).
      then( async (resp) => {
        const { data } = resp;
        setHelperText({message: 'Usuário logado com sucesso', resp: 'success' })
        await localStorage.setItem('@ifpi/user', JSON.stringify(data));
        window.location.reload();
      }).catch(error => {
        setHelperText({message: error?.response?.data, resp: 'error' })
        setCircular(false)
        setOpen(true)
    });
  }

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Logo} className={classes.image}/>
       
        <form className={classes.form} onSubmit={login} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {circular ?
            <CircularProgress style={{color: '#17871d', marginTop: 15}} color="secondary" /> :
            <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Entrar
            </Button> 
          }
          <Snackbar open={open} setOpen={setOpen} variant={helperText.resp} msg={helperText.message} />
              
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}