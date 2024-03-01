import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import UserContext from '../../contexts/UserContext';
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";

interface Props {
    onPress: boolean;
}

function SideMenu() {
    const [onPress, setOnPress] = useState(true);
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = () => {
        setOnPress(!onPress);
    }

    const handleSignOut = () => {
        setUserData({});
        navigate('/');
    }
    
    return (
        <SideMenuStyle onPress={onPress}>
            <button className='logo' onClick={handleClick}>
                {onPress 
                    ? <div className='content'>
                        <h1>School Manager</h1>
                        <MdOutlineKeyboardArrowLeft />
                    </div> 
                    : <div className='content-closed'>
                        <MdOutlineKeyboardArrowRight />
                    </div>
                }
            </button>

            <div className='division' />

            <OptionsStyle onPress={onPress}>
                <button onClick={() => navigate('/dashboard')}>
                    <MdSpaceDashboard />
                </button>
                <a onClick={() => navigate('/dashboard')}>Dashboard</a>
            </OptionsStyle>

            <FooterStyle onPress={onPress}>
                <img src={userData.photoURL as string} />
                <p>{userData.email}</p>
                <button onClick={handleSignOut}>
                    <PiSignOutBold />
                </button>
            </FooterStyle>
        </SideMenuStyle>
    )
}

const SideMenuStyle = styled.div<Props>`
    background: #0B7077;
    width: ${(props) => props.onPress ? '400px' : '90px'};
    height: 100vh;
    display: block;
    transition: 0.25s linear;

    .division {
        width: 100%;
        height: 3px;
        background-color: #05434b;
    }

    .logo {
        height: 120px;
        width: 100%;
        background: #0B7077;
        border: 0;

        .content {
            display: flex;
            justify-content: space-between;
            margin: 10px 30px 0 30px;
            font-size: 42px;
            color: #fff;

            h1 {
                position: relative;
                font-size: 24px;
                width: 60px;
                bottom: 5px;
            }
        }

        .content-closed {
            display: flex;
            justify-content: space-between;
            font-size: 38px;
            margin-left: 20px;
            color: #fff;
        }
    }

    button {
        cursor: pointer;
    }

    button:hover {
        font-size: 42px;
    }

    @media only screen and (max-width: 1100px) {
        width: 90px;

        .logo, .division {
            display: none;
        }
    }

    @media only screen and (max-width: 600px) {
        display: none;
    }
`;

const FooterStyle = styled.div<Props>`
    position: fixed;
    bottom: 0;
    padding: ${(props) => props.onPress ? '0 45px' : '0 15px'};
    height: 120px;
    width: ${(props) => props.onPress ? '310px' : '60px'};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    display: flex;
    justify-content: space-between;
    transition: 0.25s linear;

    img, button {
        position: relative;
        top: 35px;
        border-radius: 15px;
        width: 60px;
        height: 60px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        border: none;
        background: #0B7077;
        color: #fff;
    }

    p {
        display: flex;
        align-items: center;
        width: 120px;
        min-width: 40px;
        line-break: anywhere;
        ${(props) => props.onPress ? '' : 'display: none'}
    }

    img {
        ${(props) => props.onPress ? '' : 'display: none'}
    }

    button {
        font-size: 32px;
        padding-top: 8px;
    }

    @media only screen and (max-width: 1100px) {
        width: 60px;
        padding: 0 15px;

        p, img {
            display: none;
        }
    }
`;

const OptionsStyle = styled.div<Props>`
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    color: #fff;
    font-size: 22px;
    transition: 0.25s linear;

    button {
        display: flex;
        align-items: center;
        border: none;
        width: 50px;
        height: 50px;
        font-size: 40px;
        color: #fff;
        background: #0B7077;
        ${(props) => props.onPress ? '' : 'margin-left: -10px;'}
    }

    button:hover {
        width: 60px;
        height: 60px;
        font-size: 48px;
        ${(props) => props.onPress ? '' : 'margin-left: -15px;'}
    }

    a {
        cursor: pointer;
        ${(props) => props.onPress ? '' : 'display: none'}
    }

    a:hover {
        font-size: 26px;
    }

    @media only screen and (max-width: 1100px) {
        button {
            margin-left: -10px;
        }

        button:hover {
            margin-left: -15px;
        }

        a {
            display: none;
        }
    }
`

export default SideMenu;
