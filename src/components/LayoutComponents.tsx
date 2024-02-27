import React from 'react';
import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    padding-bottom: 80px;
    font-family: "Josefin Sans", sans-serif;
    font-optical-sizing: auto;
`

const BackgroundStyle = styled.div`
    background: #0B7077;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 1;

    .complement {
        background: #8FD9D1;
        position: fixed;
        top: 0;
        width: 100vw;
        height: 16%;

        @media only screen and (max-width: 1048px) {
            height: 24%;
        }

        @media only screen and (max-width: 680px) {
            height: 30%;
        }
    }

    * {
        position: fixed;
        top: -12%;
        z-index: 2;
    }
`

function Background() {
    return(
        <BackgroundStyle>
            <div className='complement'/>
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
                <path d="M 0,500 L 0,93 C 59.002564102564094,106.74615384615385 118.00512820512819,120.49230769230769 209,110 C 299.9948717948718,99.50769230769231 422.9820512820513,64.77692307692307 513,75 C 603.0179487179487,85.22307692307693 660.0666666666666,140.40000000000003 717,137 C 773.9333333333334,133.59999999999997 830.7512820512819,71.62307692307691 920,63 C 1009.2487179487181,54.37692307692309 1130.928205128205,99.1076923076923 1223,113 C 1315.071794871795,126.8923076923077 1377.5358974358974,109.94615384615385 1440,93 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#8FD9D1" fillOpacity="0.4" className="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 250)"></path>
                <path d="M 0,500 L 0,218 C 85.14358974358976,206.47692307692307 170.28717948717951,194.95384615384614 243,194 C 315.7128205128205,193.04615384615386 375.99487179487164,202.66153846153847 470,217 C 564.0051282051284,231.33846153846153 691.7333333333335,250.4 763,247 C 834.2666666666665,243.6 849.0717948717949,217.7384615384615 917,221 C 984.9282051282051,224.2615384615385 1105.9794871794873,256.6461538461539 1202,261 C 1298.0205128205127,265.3538461538461 1369.0102564102563,241.67692307692306 1440,218 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#8FD9D1" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 250)"></path>
                <path d="M 0,500 L 0,343 C 67.6948717948718,320.2692307692308 135.3897435897436,297.53846153846155 210,308 C 284.6102564102564,318.46153846153845 366.1358974358974,362.1153846153846 453,370 C 539.8641025641026,377.8846153846154 632.0666666666665,350.00000000000006 727,338 C 821.9333333333335,325.99999999999994 919.5974358974361,329.88461538461536 1002,340 C 1084.402564102564,350.11538461538464 1151.5435897435898,366.46153846153845 1222,368 C 1292.4564102564102,369.53846153846155 1366.228205128205,356.2692307692308 1440,343 L 1440,500 L 0,500 Z" stroke="none" strokeWidth="0" fill="#8FD9D1" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-2" transform="rotate(-180 720 250)"></path>
            </svg>
        </BackgroundStyle>
    )
}

export default Background;
