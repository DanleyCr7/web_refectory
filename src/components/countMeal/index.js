import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import api from '../../services/api';

const StyledCount = styled(Fab)({
  background: 'linear-gradient(45deg, #2FA33B 30%, #288A32 90%)',
  color: 'white',
  width: 180,
  position: 'fixed',
  bottom: 10,
  right: 10,
  zIndex: 10,
});

const CountMeal = ({ variant }) => {
  const [count, setCount] = useState(0);

  useEffect(_ => {
    // setTimeout(()=>{
    // apiCount();
    // }, 10000)
  }, [count])

  return <StyledCount variant='extended'>Reservas: {count}</StyledCount>
};

export default CountMeal;
