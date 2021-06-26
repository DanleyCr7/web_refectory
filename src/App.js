import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import NavDrawer from './components/navDrawer';

const App = _ => (
  <BrowserRouter>
    <div style={{display: 'flex'}}>
      <NavDrawer />
      <Routes />
    </div>
  </BrowserRouter>
)

export default App;
