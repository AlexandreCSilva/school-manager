import React from 'react';
import styled from "styled-components";
import { Props } from '../../types';

function TopBar({ children }: Props) {
    return (
        <TopBarStyle>
            { children }
        </TopBarStyle>
    );
};

const TopBarStyle = styled.div<{ isFiltering?: boolean }>`
    width: calc(100% - 60px);
    min-height: 90px;
    border-radius: 50px 50px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;

    border-bottom: 4px solid #90dae4;

    h1 {
        color: #05434b;
        font-size: 32px;
        margin-left: 5%;
        white-space: nowrap;
        font-style: bold;
        font-weight: 1200px;
    }

    .right-content {
        margin-right: 5%;
        display: flex;
        justify-content: flex-end;

        * {
            margin-right: 10px;
            transition: 0.3s;
        }

        button {
            border: none;
            border-radius: 10px;
            height: 55px;
            background: #0B7077;
            color: #fff;
            font-size: 18px;
            padding: 0 20px;
            margin-left: 30px;
            cursor: pointer;
        }

        button:hover {
            font-size: 24px;
        }

        .show-filters {
            background: #fff;
            color: #0B7077;
            font-size: 36px;
        }

        .show-filters:hover {
            font-size: 48px;
        }
    }

    @media only screen and (max-width: 1100px) {
        .right-content {
            width: 600px;
        }
    }

    @media only screen and (max-width: 600px) {
        height: ${props => props.isFiltering ? "90px" : "auto"};

        h1 {
            margin-bottom: 60px;
        }
        
        .right-content {
            width: 200px;
        }
    }
`;

export default TopBar;

