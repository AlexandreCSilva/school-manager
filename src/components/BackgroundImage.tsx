import React from 'react';
import styled from "styled-components";

function BackgroundImage() {
    return (
        <ImageStyle>    
            <img src="./1XCtBC3DuPXG5zYZi6WTdPw.jpg"/>
        </ImageStyle>
    )
}

const ImageStyle = styled.div`
    img {
        z-index: 5;
        position: fixed;
        left: 40%;
        height: 100vh;
    }

    @media only screen and (max-width: 870px) {
        img {
            height: 0;
        }
    }
`;

export default BackgroundImage;
