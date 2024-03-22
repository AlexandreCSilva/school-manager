import { animated, useSpring } from '@react-spring/web';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import styled from "styled-components";

const calc = (x: number, y: number, rect: { top: number, left: number, height: number, width: number }) => [
    -(y - rect.top - rect.height / 2) / 5,
    (x - rect.left - rect.width / 2) / 5,
    1.4,
];

const trans = (x: number, y: number, s: number) =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Logo() {
    const [ hovered, setHovered ] = useState(false);
    const navigate = useNavigate();
    const cardRef = useRef<any>();
  
    const [{ xys }, api] = useSpring(
        () => ({
            xys: [0, 0, 1],
            config: {
            mass: 1,
            tension: 170,
            friction: 7,
            precision: 0.01,
            clamp: false,
            velocity: 0,
            }
        }),
        []
    );
  
    const handleMouseLeave = () => {
        api.start({
            xys: [0, 0, 1]
        });
        setHovered(false);
    };
    
    const handleMouseMove = (e: { clientX: number, clientY: number }) => {
        const rect = cardRef.current.getBoundingClientRect();
        api.start({
            xys: calc(e.clientX, e.clientY, rect)
        });
        setHovered(true);
    };

  
    return (
        <LogoStyle
            as={animated.div}
            style={{ transform: xys.to(trans) }}
            onClick={() => navigate('/')}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            ref={ cardRef }
        >
            <IoBookSharp style={{ fontSize: "4em" }}/>
            <p>
               School Manager
            </p>
        </LogoStyle>
    );
}

const LogoStyle = styled.div`
    font-family: 'Montagu Slab';
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #0b7077;
    will-change: transform;
    padding-left: 30px;
    margin-top: -20px;
    margin-left: -15px;
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    p {
        margin-left: 10px;
    }
`;

export default Logo;
