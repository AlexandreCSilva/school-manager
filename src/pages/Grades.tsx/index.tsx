import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import TopBar from '../../components/table/TopBar';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import SelectMultiple from '../../components/table/SelectMultiple';
import SliderOptions from '../../components/table/SliderButton';
import { MdKeyboardArrowLeft } from 'react-icons/md';


function Grades() {
    const [onPress, setOnPress] = useState(true);
    const [data, setData] = useState({});
    const [onIsFiltering, setOnIsFiltering] = useState(false);
    const [students, setStudents] = useState<string[]>([])
    const [years, setYears] = useState<number[]>([])
    const [classes, setClasses] = useState<string[]>([])
    const [selectedstudents, setSelectedStudents] = useState<string[]>([])
    const [selectedyears, setSelectedYears] = useState<number[]>([])
    const [selectedclasses, setSelectedClasses] = useState<string[]>([])
    const [onSlide, setOnSlide] = useState('nada');

    const getFilters = (str: string) => {
      fetch("/api/students" + str)
        .then((res) => res.json())
        .then((json) => {
          setStudents(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })

      fetch("/api/years" + str)
        .then((res) => res.json())
        .then((json) => {
          setYears(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })

      fetch("/api/classes" + str)
        .then((res) => res.json())
        .then((json) => {
          setClasses(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })
    };

    useEffect(() => {
      fetch("/api/students/data")
        .then((res) => res.json())
        .then((json) => {
          setData(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })

      getFilters('')
    }, [])

    const handleFilter = () => {
      let strFilter = '';

      selectedyears.forEach((year) => {
        strFilter = strFilter + '&years[]=' + year
      })

      selectedstudents.forEach((student) => {
        strFilter = strFilter + '&names[]=' + student
      })

      selectedclasses.forEach((className) => {
        strFilter = strFilter + '&classes[]=' + className
      })

      strFilter = onSlide !== 'nada' ? '&state=' + onSlide + strFilter : '' + strFilter

      if (strFilter !== '') {
        strFilter = '?' + strFilter.substring(1)
      }

      fetch("/api/students/data" + strFilter)
        .then((res) => res.json())
        .then((json) => {
          setData(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })

      getFilters(strFilter)
      setOnIsFiltering(false)
    }

    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              <TopBar>
                <h1>Notas</h1>

                <div className='right-content'>
                  {onIsFiltering
                    ? <Grid container justifyContent="flex-end" spacing={2}>
                      <Grid item>
                        <SelectMultiple
                          values={years} 
                          text='Ano' 
                          size={110}
                          selectedValues={selectedyears}
                          setSelectedValues={setSelectedYears} 
                        />
                      </Grid>
                      <Grid item>
                        <SelectMultiple 
                          values={students} 
                          text='Nome' 
                          size={180}
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
                        <SliderOptions setOnSlide={setOnSlide} onSlide={onSlide} />
                      </Grid>

                      <Grid item>
                        <button onClick={handleFilter}>filtrar</button>
                      </Grid>
                    </Grid>
                    : <button className='show-filters' onClick={() => setOnIsFiltering(true)}>
                        <MdKeyboardArrowLeft />
                    </button>
                  }
                </div>
              </TopBar>
              
              <div className='content'>
                {JSON.stringify(data)}
              </div>
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Grades;
