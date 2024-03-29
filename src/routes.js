import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./pages/students";
import StudentsEdit from "./pages/students/edit";
import Menu from "./pages/menu";
import Checkin from "./pages/checkin";
import Warning from "./pages/warning";
import Lack from "./pages/lack";
import ReservaTableStudent from "./pages/reserveListStudent";
import RegisterProf from "./pages/registerProf";
import Auth from "./pages/loginProfessor";
import StudentsRegister from "./pages/studentsRegister";
import RegisterCourser from "./pages/registerCourser";
import RegisterClasses from "./pages/registerClasses";
import RegisterStudent from "./pages/registerStudent";
import Professores from "./pages/professores";
import EditProfessores from "./pages/professores/edit";
import Cursos from "./pages/cursos";
import Turmas from "./pages/turmas";
import TurmasAdmin from "./pages/turmasAdmin";
import ConfirmReservation from "./pages/confirmReservationTeacher";
import ConfirmReservationAdmin from "./pages/confirmReservationAdmin";
import EditTurmas from "./pages/turmas/edit";
import EditCursos from "./pages/cursos/edit";
import MinhasReservas from "./pages/minhasReservas";
import MinhasReservasAdmin from "./pages/minhasReservasAdmin";
import ConfirmStudentsReservations from "./pages/confirmStudentsInReservation";
import RegisterNutri from "./pages/nutricionista/register";
import Nutricionistas from "./pages/nutricionista";
import NutriEdit from "./pages/nutricionista/edit";
import SearchLuckFilter from "./pages/searchLuckFilter";

const user = JSON.parse(localStorage.getItem("@ifpi/user"));

const Routes = (_) => (
  <Switch>
    <Route path="/" exact component={Auth} />
    <Route path="/principal" component={Main} />
    <Route path="/menu" component={Menu} />
    <Route path="/checkin" component={Checkin} />
    <Route path="/warning" component={Warning} />
    <Route path="/lack" component={Lack} />
    <Route path="/reserveStudent" component={ReservaTableStudent} />
    <Route path="/registerProf" component={RegisterProf} />
    <Route path="/StudentsRegister" component={StudentsRegister} />
    <Route path="/RegisterCourser" component={RegisterCourser} />
    <Route path="/RegisterClasses" component={RegisterClasses} />
    <Route path="/RegisterStudent" component={RegisterStudent} />
    <Route path="/Professores" component={Professores} />
    <Route path="/Cursos" component={Cursos} />
    <Route path="/Turmas" component={Turmas} />
    <Route path="/RegisterNutri" component={RegisterNutri} />
    <Route path="/nutricionistas" component={Nutricionistas} />
    <Route path="/nutri/edit/:id" component={NutriEdit} />
    <Route path="/searchLuckFilter" component={SearchLuckFilter} />
    <Route path="/students/edit/:id" component={StudentsEdit} />
    <Route path="/courses/edit/:id" component={EditCursos} />
    <Route path="/teachers/edit/:id" component={EditProfessores} />
    <Route path="/class/edit/:id" component={EditTurmas} />
    <Route path="/class/reservation/:id" component={ConfirmReservation} />
    <Route
      path="/admin/class/reservation/:id"
      component={ConfirmReservationAdmin}
    />
    <Route path="/minhasReservas" component={MinhasReservas} />
    <Route
      path="/confirmStudentsReservations/:id_class/:id_reservation"
      component={ConfirmStudentsReservations}
    />
    <Route path="/turmasAdmin" component={TurmasAdmin} />
    <Route path="/admin/minhasReservas" component={MinhasReservasAdmin} />
  </Switch>
);

export default Routes;
