import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch("/api/dashboard/paginated")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
      })
    }, [])
    
    return <>
        dashboard
    </>
};

export default Dashboard;
