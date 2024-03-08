import React, { useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import TopBar from '../../components/table/TopBar';


function Grades() {
    const [onPress, setOnPress] = useState(true);

    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              <TopBar>
                <h1>Notas</h1>

                <div className='right-content'>
                  a
                </div>
              </TopBar>
              
              <div className='content'>
                b
              </div>
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Grades;
