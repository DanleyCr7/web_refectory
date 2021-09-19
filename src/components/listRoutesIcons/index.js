import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import Check from '@material-ui/icons/Check';
import School from '@material-ui/icons/School';
import Book from '@material-ui/icons/Book';
import Group from '@material-ui/icons/Group';
import LockOpen from '@material-ui/icons/LockOpen';
import EventSeat from '@material-ui/icons/EventSeat';
import { Class, ExitToApp, GolfCourseRounded, BookOutlined } from '@material-ui/icons';

import CountWarning from '../countWarning'
export const RouteList =_=>{
  const [auth, setAuth] = useState(false)
  return(
        <List>
    
          <Link to='/' color='inherit' underline='none' component={RouterLink}>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Principal' />
            </ListItem>
          </Link>

          <Link to='/menu' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <LocalDiningIcon />
              </ListItemIcon>
              <ListItemText primary='Cardápio' />
            </ListItem>
          </Link>

          <Link to='/checkin' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText primary='Entrar no Refeitório' />
            </ListItem>
          </Link>
          <Link to='/warning' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <CountWarning/>
              </ListItemIcon>
              <ListItemText primary='Reservas' />
            </ListItem>
          </Link>
          <Link to='/lack' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <School/>
              </ListItemIcon>
              <ListItemText primary='Faltas' />
            </ListItem>
          </Link>
          
          <Link to='/reserveStudent' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <Book/>
              </ListItemIcon>
              <ListItemText primary='Reservas de alunos' />
            </ListItem>
          </Link>

          <Link to='/registerProf' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <Group/>
              </ListItemIcon>
              <ListItemText primary='Registrar professor' />
            </ListItem>
          </Link>
          <Link to='/loginProfessor' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <LockOpen/>
              </ListItemIcon>
              <ListItemText primary='Login do professor' />
            </ListItem>
          </Link>
          <Link to='/RegisterCourser' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <GolfCourseRounded/>
              </ListItemIcon>
              <ListItemText primary='Registrar curso' />
            </ListItem>
          </Link>
          <Link to='/RegisterClasses' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <Class/>
              </ListItemIcon>
              <ListItemText primary='Registrar turma  ' />
            </ListItem>
          </Link>
          <Link to='/registerStudent' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <BookOutlined/>
              </ListItemIcon>
              <ListItemText primary='Registrar aluno' />
            </ListItem>
          </Link>
          
          <Link to='/reservasTurmas' color='inherit' underline='none' component={RouterLink}> 
            <ListItem>
              <ListItemIcon>
                <EventSeat/>
              </ListItemIcon>
              <ListItemText primary='Reservar turma' />
            </ListItem>
          </Link>
          <Button onClick={()=> alert('teste')}>
             <ListItem>
              <ListItemIcon>
                <ExitToApp/>
              </ListItemIcon>
              <ListItemText primary='Sair' />
            </ListItem>
          </Button>
          
        </List>
    )
}
export default RouteList;