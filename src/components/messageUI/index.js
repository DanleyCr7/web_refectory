import React, { useEffect, useState }from 'react';
import { Message } from 'semantic-ui-react'
import { StyledHeader, StyledMessage } from './styles'
export const MessageUi =()=>{
    return(
        <StyledMessage>
            <p>Preencha todos os campos</p>
        </StyledMessage>
    )
}