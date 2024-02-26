import React from 'react';
import { Container } from '../components/LayoutComponents';
import Menu from '../components/menu/Menu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
    background: #0d3b093e;
    width: 900px;
    border-radius: 50px;
    padding: 30px;
    margin-left: 8vw;
    margin-top: 8vh;

    h1 {
        color: #094e15;
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
    z-index: 3;
    width: 700px;
    height: 700px;
    position: fixed;
    right: -60px;
    bottom: -200px;
    rotate: 20deg;
    border-radius: 38% 62% 70% 30% / 30% 47% 53% 70%;
    box-shadow: rgba(6, 141, 6, 0.4) -30px 30px, rgba(6, 141, 6, 0.3) -60px 60px, rgba(16, 141, 6, 0.2) -90px 90px, rgba(6, 141, 6, 0.1) -120px 120px, rgba(6, 141, 6, 0.05) -150px 120px;
`;

const Image2 = styled(Image1)`
    width: 400px;
    height: 400px;
    right: -90px;
    bottom: 350px;
    rotate: 45deg;
    border-radius: 68% 32% 54% 46% / 44% 29% 71% 56%;
    z-index: 2;
    box-shadow: rgba(6, 141, 6, 0.4) -20px 20px, rgba(6, 141, 6, 0.3) -40px 40px, rgba(16, 141, 6, 0.2) -60px 60px, rgba(6, 141, 6, 0.1) -80px 80px, rgba(6, 141, 6, 0.05) -100px 100px;
`;

const Image3 = styled(Image1)`
    width: 280px;
    height: 200px;
    right: 350px;
    bottom: 660px;
    rotate: -20deg;
    border-radius: 68% 32% 54% 46% / 44% 60% 40% 56%;
    z-index: 1;
    box-shadow: rgba(6, 141, 6, 0.4) -15px 15px, rgba(6, 141, 6, 0.3) -30px 30px, rgba(16, 141, 6, 0.2) -45px 45px, rgba(6, 141, 6, 0.1) -60px 60px, rgba(6, 141, 6, 0.05) -75px 75px;
`;

function About() {
    const navigate = useNavigate();

    return (
        <Container>
            <Menu>
                <a onClick={() => navigate('/')}> registrar-se </a>
                <button onClick={() => navigate('/')}> Login </button>
            </Menu>

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