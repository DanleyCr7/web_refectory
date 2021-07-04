import React from 'react';
import TableLack from '../../components/tableLack';
const Lack =_=>{
    return(
        <main style={{flexGrow: 1}}>
         <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 8px',
                minHeight: '64px',
            }}
            />
          <TableLack/>
        </main>
    )
}
export default Lack;