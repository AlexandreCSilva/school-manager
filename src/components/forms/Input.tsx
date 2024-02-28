import styled from "styled-components";

export const InputStyle = styled.div`
    input {
        padding-left: 3%;
        margin: 10px 0;
        width: 97%;
        height: 58px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 400;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    input::placeholder {
        color: #748DA6;
    }
`
