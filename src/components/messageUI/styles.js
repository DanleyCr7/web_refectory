import React from 'react';
import styled from 'styled-components';
import { Header, Message} from 'semantic-ui-react'
export const StyledHeader = styled(Header)`
    background: ${props=> props.type};
    color: #fff;
    align-items: center;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    border-radius: 8px 8px 0 0;
    padding: 10px 0 10px 0;
    `
export const StyledMessage = styled(Message)`
    background: #ed1127;
    width: 250px;
    position: absolute;
    top: 100px;
    right: 5px;
    z-index: 1;
    border-radius: 8px;
    p{
        color: #fff;
        font-weight: bold;
        text-align: center;
    }
    
`