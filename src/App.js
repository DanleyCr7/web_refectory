import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import NavDrawer from './components/navDrawer';
import ModalBox from './components/modalSendBox';
import { useHistory } from 'react-router-dom';

const App = _ => {
  const [modalSend, setModalSend] = useState(false)
  const user = JSON.parse(localStorage.getItem('@ifpi/user'));
  const handleModalOpen = _ => {
    setModalSend(true);
  };

  return(
    <>
       {modalSend && <ModalBox modalSend={modalSend} setModalSend={setModalSend}/>}
      <BrowserRouter>
      <div style={{display: 'flex'}}>
        <NavDrawer handleModalOpen={handleModalOpen} />
        <Routes />
      </div>
    </BrowserRouter>
    </>
  )
}

export default App;
