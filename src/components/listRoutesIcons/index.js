import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import { Redirect } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import Check from '@material-ui/icons/Check';
import School from '@material-ui/icons/School';
import LockOpen from '@material-ui/icons/LockOpen';
import Person from '@material-ui/icons/Person';
import { Book, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import Collapsible from 'react-collapsible';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  collapsible: {
    cursor: 'pointer',
    color: 'black',
    '&:hover': {
      color: '#388e3c',
    },
  },
  list: {
    '&:hover': {
      color: '#388e3c',
    },
  },
  options: {
    '&:hover': {
      color: 'linear-gradient(45deg, #388e3c 30%, #1b5e20 90%)',
    },
  }
}))

export const RouteList = _ => {
  const [collapsibleReserve, setcollapsibleReserve] = useState(false);
  const [collapsibleRegister, setcollapsibleRegister] = useState(false);
  const user = JSON.parse(localStorage.getItem('@ifpi/user'));
  
  
  const classes = useStyles();
  return (
    <List>
      {user ?
        <>
        {/* Admin */}
          {user?.permission === 'admin' &&
            <>
              <Link className={classes.list} to='/' color='inherit' underline='none' component={RouterLink}>
                <ListItem >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary='Principal' />
                </ListItem>
              </Link>
      
              <Link className={classes.list} to='/menu' color='inherit' underline='none' component={RouterLink}>
                <ListItem>
                  <ListItemIcon>
                    <LocalDiningIcon />
                  </ListItemIcon>
                  <ListItemText primary='Cardápio' />
                </ListItem>
              </Link>

              <Link className={classes.list} to='/cursos' color='inherit' underline='none' component={RouterLink}>
                <ListItem>
                  <ListItemIcon>
                    <Book />
                  </ListItemIcon>
                  <ListItemText primary='Cursos' />
                </ListItem>
              </Link>

              <Link className={classes.list} to='/Professores' color='inherit' underline='none' component={RouterLink}>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary='Professores' />
                </ListItem>
              </Link>
              <Link className={classes.list} to='/lack' color='inherit' underline='none' component={RouterLink}>
                <ListItem>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary='Faltas' />
                </ListItem>
              </Link>
            </>
          }
      {/* Admin */}
      <Link className={classes.list} to='/Turmas' color='inherit' underline='none' component={RouterLink}>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary='Turmas' />
        </ListItem>
      </Link>
      {/* Collapsible de reservas */}
      <Link style={{ textDecoration: 'none' }} className={classes.collapsible} onClick={() => setcollapsibleReserve(!collapsibleReserve)}>
        <ListItem>
          <ListItemIcon>
            {collapsibleReserve ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </ListItemIcon>
          <ListItemText primary='Reservas' />
        </ListItem>
      </Link>

      <Collapsible open={collapsibleReserve}>
        {user?.permission  === 'admin' &&
        <>      
        <Link className={classes.list} to='/warning' color='inherit' underline='none' component={RouterLink}>
          <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary='Reservas' />
          </ListItem>
        </Link>
        <Link className={classes.list} to='/reserveStudent' color='inherit' underline='none' component={RouterLink}>
          <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary='Reservas de alunos' />
          </ListItem>
        </Link>
        </>
        }
        <Link className={classes.list} to='/reservasTurmas' color='inherit' underline='none' component={RouterLink}>
          <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary='Reservar turma' />
          </ListItem>
        </Link>
      </Collapsible>
      {/* Collapsible de reservas */}
      {/* Collapsible de cadastros */}
          {user?.permission === 'admin' &&
            <Link style={{ textDecoration: 'none' }} className={classes.collapsible} onClick={() => setcollapsibleRegister(!collapsibleRegister)}>
              <ListItem>
                <ListItemIcon>
                  {collapsibleRegister ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </ListItemIcon>
                <ListItemText primary='Cadastros' />
              </ListItem>
            </Link>
       }
      <Collapsible open={collapsibleRegister}>
        <Link className={classes.list} to='/registerProf' color='inherit' underline='none' component={RouterLink}>
          <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary='Registrar professor' />
          </ListItem>
        </Link>
        <Link className={classes.list} to='/RegisterCourser' color='inherit' underline='none' component={RouterLink}>
          <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary='Registrar curso' />
          </ListItem>
        </Link>
        <Link className={classes.list} to='/RegisterClasses' color='inherit' underline='none' component={RouterLink}>
          <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary='Registrar turma  ' />
          </ListItem>
        </Link>
        <Link className={classes.list} to='/registerStudent' color='inherit' underline='none' component={RouterLink}>
          <ListItem>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary='Registrar aluno' />
          </ListItem>
        </Link>
      </Collapsible>
       </>
      :
      <Link className={classes.list} to='/auth' color='inherit' underline='none' component={RouterLink}>
        <ListItem>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary='Acesso' />
        </ListItem>
      </Link> }
      <Link className={classes.list} to='/checkin' color='inherit' underline='none' component={RouterLink}>
        <ListItem>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          <ListItemText primary='Entrar no Refeitório' />
        </ListItem>
      </Link>
    </List>
  )
}
export default RouteList;