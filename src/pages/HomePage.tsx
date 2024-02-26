import React from 'react';
import { Container } from '../components/LayoutComponents';
import Menu from '../components/menu/Menu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
    width: 100vw;
    
    img {
        width: 100vw;
    }
`;

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Menu>
                <a onClick={() => navigate('/about')}> quem somos </a>

                <div className='division'/>

                <a onClick={() => navigate('/')}> registrar-se </a>
                <button onClick={() => navigate('/')}> Login </button>
            </Menu>

            <Content>
                
            </Content>
        </Container>
    );
}

export default HomePage;