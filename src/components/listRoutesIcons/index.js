import React from 'react';
import List from '@material-ui/core/List';
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
import CountWarning from '../countWarning'
export const RouteList =_=>{
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
                <Book/>
              </ListItemIcon>
              <ListItemText primary='Registrar professor' />
            </ListItem>
          </Link>
        </List>
    )
}
export default RouteList;