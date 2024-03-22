import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import { toast } from 'react-toastify';

function Dashboard() {
    const [onPress, setOnPress] = useState(true);
    const [data, setData] = useState()

    useEffect(() => {
        fetch("/api/dashboard/paginated?classNames[]=2-A")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
      })
      .catch((error) => {
        toast('error on get api data')
        console.log(error.message)
      })
    }, [])
    
    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              {data ? 'a' : JSON.stringify(data)}
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Dashboard;
