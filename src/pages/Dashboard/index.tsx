import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import { toast } from 'react-toastify';
import TopBar from '../../components/table/TopBar';
import SliderOptions from '../../components/table/SliderButton';
import SelectMultiple from '../../components/table/SelectMultiple';
import { Grid, Stack } from '@mui/material';

function Dashboard() {
    const [onPress, setOnPress] = useState(true);
    const [data, setData] = useState({})
    const [students, setStudents] = useState<string[]>([])
    const [years, setYears] = useState<number[]>([])
    const [classes, setClasses] = useState<string[]>([])
    const [selectedstudents, setSelectedStudents] = useState<string[]>([])
    const [selectedyears, setSelectedYears] = useState<number[]>([])
    const [selectedclasses, setSelectedClasses] = useState<string[]>([])
    const [onSlide, setOnSlide] = useState('Aprovado');

    useEffect(() => {
      fetch("/api/students/paginated")
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

      fetch("/api/years")
        .then((res) => res.json())
        .then((json) => {
          setYears(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })

      fetch("/api/classes")
        .then((res) => res.json())
        .then((json) => {
          setClasses(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })
    }, [])

    const handleFilter = () => {
      let strFilter = '';

      selectedyears.forEach((year) => {
        if (strFilter === '') {
          strFilter = '?years[]=' + year
        } else {
          strFilter = strFilter + '&years[]=' + year
        }
      })

      selectedstudents.forEach((student) => {
        if (strFilter === '') {
          strFilter = '?names[]=' + student
        } else {
          strFilter = strFilter + '&names[]=' + student
        }
      })

      selectedclasses.forEach((className) => {
        if (strFilter === '') {
          strFilter = '?classes[]=' + className
        } else {
          strFilter = strFilter + '&classes[]=' + className
        }
      })

      fetch("/api/students/paginated" + strFilter)
        .then((res) => res.json())
        .then((json) => {
          setData(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })
    }
    
    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              <TopBar>
                <h1>Visão geral</h1>

                <div className='right-content'>
                  <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                      <SelectMultiple
                        values={years} 
                        text='Ano' 
                        size={90}
                        selectedValues={selectedyears}
                        setSelectedValues={setSelectedYears} 
                      />
                    </Grid>
                    <Grid item>
                      <SelectMultiple 
                        values={students} 
                        text='Nome' 
                        size={150}
                        selectedValues={selectedstudents}
                        setSelectedValues={setSelectedStudents}  
                      />
                    </Grid>
                    <Grid item>
                      <SelectMultiple 
                        values={classes} 
                        text='Classe' 
                        size={110}
                        selectedValues={selectedclasses}
                        setSelectedValues={setSelectedClasses} 
                      />
                    </Grid>
                    <Grid item>
                      <SliderOptions setOnSlide={setOnSlide} />
                    </Grid>

                    <Grid item>
                      <button onClick={handleFilter}>filtrar</button>
                    </Grid>
                  </Grid>
                </div>
              </TopBar>
              
              <div className='content'>
                {data ? JSON.stringify(data) : ''}
              </div>
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Dashboard;
