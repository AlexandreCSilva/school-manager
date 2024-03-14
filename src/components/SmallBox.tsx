import React from 'react';
import styled from "styled-components";
import { Props } from '../types';

function SmallBox({ children }: Props) {
    return (
        <BoxStyle>
            { children }
        </BoxStyle>
    );
}

const BoxStyle = styled.div`
    height: 95%;
    width: 45%;
    margin: 2.5% 2.5%;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 22px 25px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    position: relative;

    @media only screen and (max-width: 1100px) {
        height: 92.5%;
        width: 92.5%;
    }

    @media only screen and (max-width: 870px) {
        height: 87.5%;
        width: 87.5%;
        margin: 0;
        margin-bottom: 30px;
    }
`;

export default SmallBox;
