import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import { toast } from 'react-toastify';
import TopBar from '../../components/table/TopBar';
import SliderOptions from '../../components/table/SliderButton';
import SelectMultiple from '../../components/table/SelectMultiple';

function Dashboard() {
    const [onPress, setOnPress] = useState(true);
    const [data, setData] = useState({})
    const [students, setStudents] = useState<string[]>([])
    const [onSlide, setOnSlide] = useState('Aprovado');

    useEffect(() => {
      fetch("/api/dashboard/paginated")
        .then((res) => res.json())
        .then((json) => {
          setData(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })
      
      fetch("/api/students")
        .then((res) => res.json())
        .then((json) => {
          setStudents(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })
    }, [])

    useEffect(() => {
      console.log(onSlide)
    }, [onSlide])
    
    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              <TopBar>
                <h1>Visão geral</h1>

                <div className='right-content'>
                  <SelectMultiple names={students} />
                  <SliderOptions setOnSlide={setOnSlide} />
                </div>
              </TopBar>
              {data ? JSON.stringify(data) : 'a'}
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Dashboard;
