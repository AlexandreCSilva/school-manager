import React from 'react';
import Menu from '../components/menu/Menu';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../components/LayoutComponents';

const Content = styled.div`
    width: 100vw;

    .box {
        z-index: -2;
        width: 100vw;
        height: 600px;
        background: #8FD9D1;
        border-radius: 0 0 50px 50px;
        overflow: hidden;

        * {
            position: fixed;
            top: -400px;
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
        }

        @media only screen and (max-width: 870px) {
            height: 100vh;
            border-radius: 0;

            * {
                top: 0;
                left: -260px;
            }

            img {
                top: 490px;
                left: 45vw;
            }
        }

        @media only screen and (max-width: 650px) {
            p, .text-box {
                width: 400px;
            }

            p {
                top: 420px;
            }
        }
    }
`;

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Menu>
                <a className='emphasis' onClick={() => navigate('/')}> home </a>
                <a onClick={() => navigate('/about')}> sobre nós </a>

                <div className='division'/>

                <a onClick={() => navigate('/')}> registrar-se </a>
                <button onClick={() => navigate('/')}> Login </button>
            </Menu>

            <Content>
                <div className='box'>
                    <svg width="1872" height="670" viewBox="0 0 572 270" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M402.792 -232.916C478.007 -216.64 518.727 -143.876 549.061 -76.7684C575.478 -18.3276 577.621 46.779 557.717 109.823C538.413 170.965 503.447 232.818 442.64 260.305C385.85 285.976 328.349 245.903 267.296 241.104C186.448 234.749 86.9639 284.011 33.2938 228.129C-21.6423 170.929 3.42263 73.8967 34.0499 -1.75536C61.5992 -69.8048 124.032 -114.518 188.331 -154.826C255.286 -196.8 327.467 -249.215 402.792 -232.916Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>
                    <svg width="1848" height="690" viewBox="0 0 548 290" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M367.127 -216.975C440.35 -217.218 515.368 -175.059 541.014 -110.856C565.229 -50.233 507.161 11.2754 483.574 74.5452C463.197 129.205 461.245 191.046 414.372 228.849C361.062 271.844 287.859 302.895 223.951 283.933C162.124 265.588 151.837 191.225 116.093 140.346C76.0203 83.3063 -19.3131 40.2159 5.24481 -27.3767C30.095 -95.7735 140.085 -74.7092 206.957 -109.745C266.223 -140.795 301.05 -216.755 367.127 -216.975Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>
                    <svg width="1826" height="607" viewBox="0 0 526 307" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M368.318 -226.509C437.781 -215.915 488.819 -159.593 515.896 -98.3425C540.167 -43.4415 512.73 16.6426 502.532 77.0948C490.066 150.996 515.427 243.654 450.699 288.148C385.588 332.906 303.079 281.789 227.506 266.148C151.131 250.342 52.6444 262.25 14.7601 197.929C-23.0133 133.797 26.9422 52.6574 60.7019 -17.0541C87.3707 -72.1235 130.846 -113.739 182.838 -149.14C240.284 -188.255 300.979 -236.779 368.318 -226.509Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>
                    <svg width="1820" height="691" viewBox="0 0 520 291" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M331.794 -199.18C384.081 -181.463 446.265 -184.076 480.424 -142.909C518.382 -97.1653 522.451 -35.5695 517.273 24.3473C510.511 102.597 512.023 192.381 447.047 243.333C377.799 297.636 278.949 297.881 195.855 276.394C116.178 255.792 49.2456 203.311 15.7236 131.803C-14.9888 66.2872 6.32704 -8.61382 28.9207 -79.7075C50.6076 -147.948 70.4167 -231.019 139.716 -258.355C206.618 -284.745 265.96 -221.487 331.794 -199.18Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>
                    <svg width="1819" height="651" viewBox="0 0 519 251" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M304.84 -165.412C377.367 -152.716 480.501 -182.765 511.724 -119.807C543.286 -56.1643 450.622 5.78689 423.703 74.2631C401.717 130.188 423.772 206.032 370.822 238.613C317.76 271.261 256.299 224.839 196.34 214.16C132.28 202.75 48.1793 226.354 13.1669 174.911C-22.0038 123.235 30.3228 55.9097 46.4135 -6.12486C63.2445 -71.0133 48.4095 -153.796 107.947 -190.493C167.645 -227.289 237.3 -177.236 304.84 -165.412Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>
                    <svg width="1854" height="668" viewBox="0 0 554 268" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M340.071 -188.631C392.469 -174.663 430.659 -139.784 464.35 -99.7274C506.038 -50.164 557.68 -1.20747 552.644 64.1023C546.849 139.259 508.867 222.422 436.898 256.304C367.401 289.022 295.234 239.583 223.683 218.972C160.51 200.775 89.9075 194.988 50.7099 145.061C7.86235 90.4837 -13.5429 15.696 11.4699 -51.3336C35.3923 -115.441 105.8 -150.538 171.215 -177.87C225.836 -200.692 284.541 -203.434 340.071 -188.631Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>
                    <svg width="1790" height="672" viewBox="0 0 490 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M307.129 -198.411C368.478 -184.256 405.815 -131.909 437.821 -80.711C470.201 -28.9148 497.227 27.3093 486.636 88.7362C474.907 156.758 444.856 232.905 378.656 262.436C315.025 290.822 249.492 246.573 186.827 222.48C138.14 203.76 93.8424 181.002 62.8022 140.997C27.3482 95.3034 -8.93346 43.4738 3.11169 -14.2959C15.7001 -74.671 68.9011 -119.651 124.121 -153.092C180.092 -186.989 245.024 -212.741 307.129 -198.411Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>
                    <svg width="1877" height="649" viewBox="0 0 577 249" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M353.104 -205.837C410.879 -194.185 473.084 -190.274 511.333 -148.41C556.385 -99.0998 587.265 -32.7699 571.793 33.5242C555.821 101.961 494.956 151.646 432.349 190.019C368.409 229.209 296.982 254.533 223.733 246.856C141.407 238.226 48.7848 216.287 13.2656 146.092C-21.3381 77.7071 26.3912 -3.37932 60.664 -75.4086C87.8903 -132.629 125.096 -187.678 184.736 -214.278C238.936 -238.451 296.387 -217.275 353.104 -205.837Z" stroke="white" strokeWidth="0.666667"/>
                    </svg>

                    <div className='text-box'>
                        Melhore o seu ambiente escolar por meio da tecnologia.
                    </div>

                    <p>
                        Atendendo de acordo as suas nescessidades as demandas da sua escola
                    </p>

                    <img src='./8602650.png' width={340}/>
                </div>
            </Content>
        </Container>
    );
}

export default HomePage;