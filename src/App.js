import React, { useState, useEffect } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Routes from './routes';
import NavDrawer from './components/navDrawer';
import ModalBox from './components/modalSendBox';

const App = _ => {
  const [modalSend, setModalSend] = useState(false)
  const user = JSON.parse(localStorage.getItem('@ifpi/user'));
  const handleModalOpen = _ => {
    setModalSend(true);
  };

  return(
    <>
       {modalSend && <ModalBox modalSend={modalSend} setModalSend={setModalSend}/>}
      <HashRouter>
      <div style={{display: 'flex'}}>
        <NavDrawer handleModalOpen={handleModalOpen} />
        <Routes />
      </div>
    </HashRouter>
    </>
  )
}

export default App;
