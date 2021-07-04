import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/main';
import Menu from './pages/menu';
import Checkin from './pages/checkin';
import Warning from './pages/warning';
import Lack from './pages/lack';

const Routes = _ => (
  <Switch>
    <Route path='/' exact component={Main} />
    <Route path='/menu' component={Menu} />
    <Route path='/checkin' component={Checkin} />
    <Route path='/warning' component={Warning}/>
    <Route path='/lack' component={Lack}/>
  </Switch>
);

export default Routes;