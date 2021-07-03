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
              <ListItemText primary='Avisos' />
            </ListItem>
          </Link>
        </List>
    )
}
export default RouteList;