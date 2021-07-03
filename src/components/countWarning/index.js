import React, {useState} from 'react';
import styles from '@material-ui/styles';
import Badge from '@material-ui/core/Badge'
import Warning from '@material-ui/icons/Warning';
const CountWarning =_=>{
    const [badge, setBadge] = useState(1);
    return(
        <Badge badgeContent={badge} color="error">
            <Warning />
        </Badge>
    )
}

export default CountWarning;