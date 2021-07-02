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
`
export const StyledMessage = styled(Message)`
    background: ${props=> props.type};
    width: 350px;
    height: 150px;
    border-radius: 8px;
    position: absolute;
    right: 150px;
    top: 50px;
`