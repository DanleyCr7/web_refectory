import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/main';
import Menu from './pages/menu';
import Checkin from './pages/checkin';
import Warning from './pages/warning';
import Lack from './pages/lack';
import ReservaTableStudent from './pages/reserveListStudent';
import RegisterProf from './pages/registerProf';

const Routes = _ => (
  <Switch>
    <Route path='/' exact component={Main} />
    <Route path='/menu' component={Menu} />
    <Route path='/checkin' component={Checkin} />
    <Route path='/warning' component={Warning}/>
    <Route path='/lack' component={Lack}/>
    <Route path='/reserveStudent' component={ReservaTableStudent}/>
    <Route path='/registerProf' component={RegisterProf}/>
  </Switch>
);

export default Routes;