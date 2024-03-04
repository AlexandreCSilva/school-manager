import React, { useEffect, useState } from 'react';
import { Props } from '../../types';
import styled from 'styled-components';
import Options from './OptionsButton';
import Logo from './Logo';

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
                        windowSize.innerWidth >= 720 
                        ? children 
                        : <Options />
                    }
                </div>
            </MenuBar>
    );
}

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

        button.emphasis {
            color: #fff;
            background: #FD661F;
        }

        .emphasis {
            color: #FD661F;

            button {
                color: #fff;
                background: #FD661F;
            }
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
            padding: 12px 24px;
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

export default Menu;
