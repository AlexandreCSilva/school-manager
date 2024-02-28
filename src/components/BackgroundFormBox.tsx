import React from 'react';
import styled from "styled-components";
import Box from './Box';

function BackgroundFormBox() {
    return (
        <BackgroundFormBoxStyle>
            <Box>
                <div />
            </Box>
        </BackgroundFormBoxStyle>
    )
}

const BackgroundFormBoxStyle = styled.div`
    z-index: 3;
    overflow: clip;

    * {
        * {
            width: 1200px;
        }

        width: 40%;
        height: 200vh;
        top: -200px;
        left: 100px;
        border-radius: 0;
    }

    @media only screen and (max-width: 870px) {
        * {
            width: 1200px;
            height: 200vh;
            top: -200px;
            left: 100px;
        }
    }
`;

export default BackgroundFormBox;
