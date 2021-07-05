import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import NavDrawer from './components/navDrawer';
import ModalBox from './components/modalSendBox';

const App = _ => {
  const [modalSend, setModalSend] = useState(false)
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
