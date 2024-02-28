import React from 'react';
import Menu from '../../components/menu/Menu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../components/LayoutComponents';
import Box from '../../components/Box';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Menu>
                <a className='emphasis' onClick={() => navigate('/')}> home </a>
                <a onClick={() => navigate('/about')}> sobre nós </a>

                <div className='division'/>

                <a onClick={() => navigate('/sign-up')}> registrar-se </a>
                <button onClick={() => navigate('/sign-in')}> Login </button>
            </Menu>

            <Content>
                <Box>
                    <div className='text-box'>
                        Melhore o seu ambiente escolar por meio da tecnologia.
                    </div>

                    <p>
                        Atendendo de acordo as suas nescessidades as demandas da sua escola
                    </p>

                    <img src='./8602650.png' width={340}/>
                </Box>
            </Content>
        </Container>
    );
}

const Content = styled.div`
    * {
        width: 100%;
        height: 640px;
    }

    .text-box {
        top: 200px;
        left: 80px;
        font-family: "Josefin Sans", sans-serif;
        font-optical-sizing: auto;
        font-size: 48px;
        font-weight: 700;
        font-style: normal;
        width: 700px;
        color: #0B7077;
    }

    p {
        top: 380px;
        left: 80px;
        font-family: "Josefin Sans", sans-serif;
        font-optical-sizing: auto;
        font-size: 24px;
        font-weight: 500;
        font-style: normal;
        width: 500px;
        color: #fff;
    }

    img {
        top: 90px;
        left: 60vw;
        width: 350px;
        height: 550px;
    }

    @media only screen and (max-width: 870px) {
        * {
            width: 1200px;
            height: 200vh;
            top: -200px;
            left: 100px;
        }

        img {
            top: 490px;
            left: 45vw;
        }
    }

    @media only screen and (max-width: 650px) {
        p, .text-box {
            width: 380px;
        }

        p {
            top: 420px;
        }
    }
`;

export default HomePage;
