import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/main';
import Menu from './pages/menu';
import Checkin from './pages/checkin';
import Warning from './pages/warning';
import Lack from './pages/lack';
import ReservaTableStudent from './pages/reserveListStudent';
import RegisterProf from './pages/registerProf';
import LoginProfessor from './pages/loginProfessor';
import ReservasTurmas from './pages/reservasTurmas';
import StudentsRegister from './pages/studentsRegister';
import RegisterCourser from './pages/registerCourser';
import RegisterClasses from './pages/registerClasses';
import RegisterStudent from './pages/registerStudent';
import Professores from './pages/professores';
import Cursos from './pages/cursos';

const Routes = _ => (
  <Switch>
    <Route path='/' exact component={Main} />
    <Route path='/menu' component={Menu} />
    <Route path='/checkin' component={Checkin} />
    <Route path='/warning' component={Warning} />
    <Route path='/lack' component={Lack} />
    <Route path='/reserveStudent' component={ReservaTableStudent} />
    <Route path='/registerProf' component={RegisterProf} />
    <Route path='/loginProfessor' component={LoginProfessor} />
    <Route path='/reservasTurmas' component={ReservasTurmas} />
    <Route path='/StudentsRegister' component={StudentsRegister} />
    <Route path='/RegisterCourser' component={RegisterCourser} />
    <Route path='/RegisterClasses' component={RegisterClasses} />
    <Route path='/RegisterStudent' component={RegisterStudent} />
    <Route path='/Professores' component={Professores} />
    <Route path='/Cursos' component={Cursos} />
  </Switch>
);

export default Routes;