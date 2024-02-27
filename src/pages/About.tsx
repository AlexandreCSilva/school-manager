import React from 'react';
import Menu from '../components/menu/Menu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Background, { Container } from '../components/LayoutComponents';

const Content = styled.div`
    width: 900px;
    border-radius: 50px;
    padding: 30px;
    margin-left: 8vw;
    position: relative;
    top: 130px;
    z-index: 3;

    @media only screen and (max-width: 1630px) {
        margin: 0 20%;
        width: 60%;
        display: wrap;
        justify-content: center;
    }

    h1 {
        color: #0B7077;
        font-size: 32px;
        margin-bottom: 30px;
    }

    p {
        color: white;
        text-indent: 5ch;
        font-size: 24px;
        margin-bottom: 24px;
    }
`;

const Image1 = styled.img`
    z-index: 6;
    width: 700px;
    height: 700px;
    position: fixed;
    right: -60px;
    bottom: -200px;
    rotate: 20deg;
    border-radius: 38% 62% 70% 30% / 30% 47% 53% 70%;

    animation-name: ani-float;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out; 
    
    @keyframes ani-float {
        0% { transform: translate(0,  0px); }
        50% { transform: translate(0, 25px); }
        100% { transform: translate(0, -0px); }    
    }

    @media only screen and (max-width: 1630px) {
        z-index: -1;
    }
`;

const Image2 = styled(Image1)`
    width: 400px;
    height: 400px;
    right: -90px;
    bottom: 350px;
    rotate: 45deg;
    border-radius: 68% 32% 54% 46% / 44% 29% 71% 56%;
    z-index: 5;

    @media only screen and (max-width: 1630px) {
        z-index: -1;
    }
`;

const Image3 = styled(Image1)`
    width: 280px;
    height: 200px;
    right: 350px;
    bottom: 660px;
    rotate: -20deg;
    border-radius: 68% 32% 54% 46% / 44% 60% 40% 56%;
    z-index: 4;

    @media only screen and (max-width: 1630px) {
        z-index: -1;
    }
`;

function About() {
    const navigate = useNavigate();

    return (
        <Container>
            <Menu>
                <a onClick={() => navigate('/')}> Home </a>
                <a className='emphasis' onClick={() => navigate('/about')}> quem somos </a>

                <div className='division'/>
                <a onClick={() => navigate('/')}> registrar-se </a>
                <button onClick={() => navigate('/')}> Login </button>
            </Menu>

            <Background />

            <Content>
                <h1>
                    Descubra o Futuro da Educação com School Manager (TEXTO GERADO PELO CHAT GPT)
                </h1>

                <p>
                    Na vanguarda da revolução educacional, a School Manager está redefinindo a forma como as instituições educacionais interagem com dados. Nossa missão é proporcionar uma plataforma inovadora de software que capacita educadores a alcançarem novos patamares de excelência.
                </p>

                <p>
                    Imagine um ambiente onde cada aluno e docente é compreendido em profundidade, onde suas necessidades individuais são atendidas de forma personalizada. É isso que oferecemos com nossas soluções de cadastro e análise de dados.
                </p>

                <p>
                    Com nossos softwares de ponta, as instituições educacionais podem finalmente desbloquear o poder dos dados para impulsionar o sucesso dos alunos. Desde o momento em que um aluno entra na escola até o dia da formatura, nossas ferramentas fornecem insights valiosos que ajudam a moldar experiências de aprendizagem significativas.
                </p>

                <p>
                    Nossa plataforma intuitiva simplifica o processo de coleta, organização e análise de dados, permitindo que os educadores tomem decisões informadas de maneira rápida e eficiente. Não importa o tamanho da sua instituição ou o nível de complexidade dos seus dados, estamos aqui para simplificar e potencializar o seu trabalho.
                </p>

                <p>
                    Além disso, estamos comprometidos em garantir a segurança e privacidade dos dados, cumprindo os mais altos padrões de proteção e conformidade.
                </p>

                <p>
                    Junte-se a nós nesta jornada para transformar a educação. Descubra como a School Manager pode ajudar sua instituição a alcançar novos horizontes de sucesso acadêmico. Entre em contato hoje mesmo para uma demonstração personalizada. O futuro da educação começa aqui.
                </p>
            </Content>

            <Image1 src='./ElEd1.jpg'></Image1>
            <Image2 src='./ElEd2.jpg'></Image2>
            <Image3 src='./PRO_Landing_KidsPainting.png'></Image3>
        </Container>
    );
}

export default About;