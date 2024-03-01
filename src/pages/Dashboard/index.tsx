import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';

function Dashboard() {
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
          <SideMenu />
      </Container>
    )
};

export default Dashboard;
