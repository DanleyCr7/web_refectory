import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/students';
import StudentsEdit from './pages/students/edit';
import Menu from './pages/menu';
import Checkin from './pages/checkin';
import Warning from './pages/warning';
import Lack from './pages/lack';
import ReservaTableStudent from './pages/reserveListStudent';
import RegisterProf from './pages/registerProf';
import Auth from './pages/loginProfessor';
import StudentsRegister from './pages/studentsRegister';
import RegisterCourser from './pages/registerCourser';
import RegisterClasses from './pages/registerClasses';
import RegisterStudent from './pages/registerStudent';
import Professores from './pages/professores';
import EditProfessores from './pages/professores/edit';
import Cursos from './pages/cursos';
import Turmas from './pages/turmas';
import TurmasAdmin from './pages/turmasAdmin';
import ConfirmReservation from './pages/confirmReservationTeacher';
import ConfirmReservationAdmin from './pages/confirmReservationAdmin';
import EditTurmas from './pages/turmas/edit';
import EditCursos from './pages/cursos/edit';
import MinhasReservas from './pages/minhasReservas';
import MinhasReservasAdmin from './pages/minhasReservasAdmin';
import ConfirmStudentsReservations from './pages/confirmStudentsInReservation';

const user = JSON.parse(localStorage.getItem('@ifpi/user'));

const Routes = _ => (
  <Switch>
    <Route path='/refeitorio/' exact component={Auth} />
    <Route path='/refeitorio/principal' component={Main} />
    <Route path='/refeitorio/menu' component={Menu} />
    <Route path='/refeitorio/checkin' component={Checkin} />
    <Route path='/refeitorio/warning' component={Warning} />
    <Route path='/refeitorio/lack' component={Lack} />
    <Route path='/refeitorio/reserveStudent' component={ReservaTableStudent} />
    <Route path='/refeitorio/registerProf' component={RegisterProf} />
    <Route path='/refeitorio/StudentsRegister' component={StudentsRegister} />
    <Route path='/refeitorio/RegisterCourser' component={RegisterCourser} />
    <Route path='/refeitorio/RegisterClasses' component={RegisterClasses} />
    <Route path='/refeitorio/RegisterStudent' component={RegisterStudent} />
    <Route path='/refeitorio/Professores' component={Professores} />
    <Route path='/refeitorio/Cursos' component={Cursos} />
    <Route path='/refeitorio/Turmas' component={Turmas} />

    <Route path='/refeitorio/students/edit/:id' component={StudentsEdit} />
    <Route path='/refeitorio/courses/edit/:id' component={EditCursos} />
    <Route path='/refeitorio/teachers/edit/:id' component={EditProfessores} />
    <Route path='/refeitorio/class/edit/:id' component={EditTurmas} />
    <Route path="/refeitorio/class/reservation/:id" component={ConfirmReservation} />
    <Route path="/refeitorio/admin/class/reservation/:id" component={ConfirmReservationAdmin} />
    <Route path="/refeitorio/minhasReservas" component={MinhasReservas} />
    <Route path='/refeitorio/confirmStudentsReservations/:id_class/:id_reservation' component={ConfirmStudentsReservations} />
    <Route path="/refeitorio/turmasAdmin" component={TurmasAdmin} />
    <Route path="/refeitorio/admin/minhasReservas" component={MinhasReservasAdmin} />
  </Switch>
);

export default Routes;