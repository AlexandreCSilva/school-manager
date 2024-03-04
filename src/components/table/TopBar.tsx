import React from 'react';
import styled from "styled-components";
import { Props } from '../../types';

function TopBar({ children }: Props) {
    return (
        <TopBarStyle>
            { children }

            <div className='under-bar' />
        </TopBarStyle>
    );
};

const TopBarStyle = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 90px;
    border-radius: 50px 50px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        color: #05434b;
        font-size: 24px;
        margin-left: 5%;
    }

    .under-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4px;
        background: #90dae4;
    }

    .right-content {
        width: auto;
        margin-right: 5%;
        display: flex;
        max-height: 60px;

        * {
            margin-right: 10px;
        }
    }
`;

export default TopBar;

