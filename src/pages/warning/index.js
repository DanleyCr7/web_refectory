import React from 'react';
import Badge from '@material-ui/core/Badge';
import WarningTable from '../../components/warningTable';
const Warning = _ => {
    return (
        <main style={{ flexGrow: 1 }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 8px',
                minHeight: '64px',
            }}
            />
            <WarningTable />
        </main>
    );
}
export default Warning;