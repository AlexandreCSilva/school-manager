import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';

function Dashboard() {
    const [onPress, setOnPress] = useState(true);
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("/api/dashboard/paginated?classNames[]=2-A")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
      })
    }, [])
    
    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              a
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Dashboard;
