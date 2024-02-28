import React from 'react';
import styled from "styled-components";
import { Props } from "../../types";

function Form({ children }: Props) {
    return (
        <FormStyle>
            { children }
        </FormStyle>
    )
}

const FormStyle = styled.div`
    position: fixed;
    top: 0;
    width: 40%;
    height: 100vh;
    display: flex;
    align-items: center;
    z-index: 4;

    form {
        padding: 0 20%;
    }

    input {
        padding-left: 3%;
        margin: 10px 0;
        width: 97%;
        height: 58px;
        border: none;
        border-radius: 5px;
        font-size: 22px;
        font-weight: 500;
        color: #0B7077;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    button {
        margin: 10px 0;
        width: 100%;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 10px;
        border-radius: 5px;
        background-color: #0B7077;
        color: white;
        font-weight: 400;
        font-family: 'Mochiy Pop One', sans-serif;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
        font-size: 20px;
        -webkit-transition: -webkit-transform 0.2s;
        transition: -webkit-transform 0.2s;
        transition: transform 0.2s;
        transition: transform 0.2s, -webkit-transform 0.2s;
    }

    button:hover {
        -webkit-transform: scale(1, 1.1);
        transform: scale(1, 1.1);
        cursor: pointer;
    }

    @media only screen and (max-width: 870px) {
        width: 100%;
    }
`

export default Form;
