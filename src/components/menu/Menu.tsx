import React, { useEffect, useRef, useState } from 'react';
import { Props } from '../../types';
import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import Options from './OptionsButton';

const MenuBar = styled.div`
    max-height: 7vh;
    width: 94vw;
    padding: 10px 3vw;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 10;
    
    .side-menu {
        display: flex;
        align-items: center;
        
        * {
            margin-left: 30px;
        }

        .division {
            width: 3px;
            height: 35px;
            border-radius: 50px;
            background: #0B7077;
            font-weight: 400;
        }

        .emphasis {
            color: #FD661F;
        }
        
        a {
            font-weight: 700;
            color: #0B7077;
            cursor: pointer;
            font-size: 18px;
            transition: 0.3s;
        }

        a:hover {
            font-size: 22px;
        }

        button {
            background: #0B7077;
            border-radius: 10px;
            padding: 5px 10px;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
            border: none;
            box-shadow: none;
            transition: 0.3s;
        }

        button:hover {
            font-size: 28px;
        }
    }
`;

const LogoStyle = styled.div`
    font-family: 'Montagu Slab';
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #0B7077;
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
    
    const handleMouseMove = (e: any) => {
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
  
const calc = (x: number, y: number, rect: { top: number, left: number, height: number, width: number }) => [
    -(y - rect.top - rect.height / 2) / 5,
    (x - rect.left - rect.width / 2) / 5,
    1.4,
];

const trans = (x: number, y: number, s: number) =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

function Menu({ children }: Props) {
    const [windowSize, setWindowSize] = useState(getWindowSize());


    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
            <MenuBar>
                <Logo />

                <div className='side-menu'>
                    { 
                        windowSize.innerWidth > 650 
                        ? children 
                        : <Options />
                    }
                </div>
            </MenuBar>
    );
}


export default Menu;