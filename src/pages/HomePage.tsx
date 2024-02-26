import React from 'react';
import { Container } from '../components/LayoutComponents';
import Menu from '../components/menu/Menu';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Menu>
                <a onClick={() => navigate('/')}> quem somos </a>

                <div className='division'/>

                <a> registrar-se </a>
                <button> Login </button>
            </Menu>

        </Container>
    );
}

export default HomePage;