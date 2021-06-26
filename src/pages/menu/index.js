import React from 'react';

import MenuTable from '../../components/menuTable';
import CountMeal from '../../components/countMeal';

const Menu = _ => {
  return (
    <>
      <main style={{flexGrow: 1}}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
          }}
        />
        <MenuTable />
      </main>
      <CountMeal />
    </>
  );
};

export default Menu;