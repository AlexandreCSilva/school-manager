import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from "styled-components";
import { Props } from '../types';

interface ClickProps {
    onPress: boolean;
    setOnPress: Dispatch<SetStateAction<boolean>>;
}

interface ClickPropsComplete extends ClickProps{
    children: ReactNode;
}

function ContentBox({ children }: Props) {
    return (
        <ContentBoxStyle>
            { children }
        </ContentBoxStyle>
    )
}

function BaseBox({ children, onPress, setOnPress }: ClickPropsComplete) {
    return (
        <BaseBoxStyle onPress={onPress} setOnPress={setOnPress}>
            { children }
        </BaseBoxStyle>
    )
}

const ContentBoxStyle = styled.div`
    position: fixed;
    top: 0;
    z-index: 1;
    height: 100vh;
    width: 100vw;
    background: rgb(71,168,195);
    background: linear-gradient(180deg, rgba(71,168,195,1) 9%, rgba(226,246,252,1) 100%);  
`

const BaseBoxStyle = styled.div<ClickProps>`
    transition: 0.25s linear;
    margin-top: 50px;
    margin-left: ${(props) => props.onPress ? 'calc(80px + 400px)': 'calc(80px + 90px)' };
    margin-right: 50px;
    height: 90vh;
    width: auto;
    min-width: calc(60% - 90px);
    background: #fff;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    overflow: hidden;
    position: relative;

    .content {
        padding: 20px 30px;
        width: auto;
        height: auto;
    }
    
    .footer {
        position: absolute;
        width: 110%;
        height: 90px;
        bottom: 0px;
        left: -10%;
    }

    @media only screen and (max-width: 1100px) {
        margin-left: calc(5% + 90px);
    }

    @media only screen and (max-width: 600px) {
        margin: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;

        .content {
            height: 52%;
            
            .footer {
                left: -5%;
            }
        }
    }
`
export { ContentBox, BaseBox };
