import React, { useRef, useState } from 'react';
import { Props } from '../../types';
import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

const MenuBar = styled.div`
    max-height: 7vh;
    padding: 10px 30px;

    display: flex;
    justify-content: space-between;

    .side-menu {
        display: flex;
        align-items: center;
        
        * {
            margin-left: 30px;
            font-weight: 400;
        }

        .division {
            width: 3px;
            height: 35px;
            border-radius: 50px;
            background: #fff;
        }
        
        a {
            font-weight: 700;
            color: #fff;
            cursor: pointer;
            font-size: 18px;
            transition: 0.3s;
        }

        a:hover {
            font-size: 22px;
        }

        button {
            background: #fff;
            border-radius: 10px;
            padding: 5px 10px;
            font-size: 24px;
            color: #10d490;
            cursor: pointer;
            border: none;
            box-shadow: none;
            transition: 0.3s;
        }

        button:hover {
            font-size: 28px;
            box-shadow: rgb(7, 105, 22) 0px 20px 30px -10px;
        }
    }
`;

const LogoStyle = styled.div`
    font-family: 'Montagu Slab';
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #31d84d;
    will-change: transform;
    padding-left: 30px;
    margin-top: -20px;
    margin-left: -15px;
    width: 200px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
          friction: 26,
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
          School Manager
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

function Menu({ children }: Props) {
    return (
            <MenuBar>
                <Logo />

                <div className='side-menu'>
                    { children }
                </div>
            </MenuBar>
    );
}


export default Menu;