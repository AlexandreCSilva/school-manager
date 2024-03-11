import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import TopBar from '../../components/table/TopBar';
import { toast } from 'react-toastify';
import { Box, Grid, Paper } from '@mui/material';
import SelectMultiple from '../../components/table/SelectMultiple';
import SliderOptions from '../../components/table/SliderButton';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { BarChart, PieChart, pieArcLabelClasses } from '@mui/x-charts';
import SmallBox from '../../components/SmallBox';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { fullDataType } from '../../api/rawData';
import { colorPallete, translateGrade } from '../../utils';

function Grades() {
    const [onPress, setOnPress] = useState(true);
    const [data, setData] = useState([]);
    const [onIsFiltering, setOnIsFiltering] = useState(false);
    const [students, setStudents] = useState<string[]>([])
    const [years, setYears] = useState<number[]>([])
    const [classes, setClasses] = useState<string[]>([])
    const [selectedstudents, setSelectedStudents] = useState<string[]>([])
    const [selectedyears, setSelectedYears] = useState<number[]>([])
    const [selectedclasses, setSelectedClasses] = useState<string[]>([])
    const [onSlide, setOnSlide] = useState('nada');
    const [pieData, setPieData] = useState<any[]>([]);

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

    useEffect(() => {
      if (data.length !== 0) {
        const fullData = data as fullDataType[];
        let aux: any[] = [];
        const response: any[] = [];

        fullData.forEach((fdata) => {
          aux = [ 
            ...aux, 
            ...Object.entries(fdata.firstSemester), 
            ...Object.entries(fdata.secondSemester)
          ];
        })

        for(let i = 0; i <= 13; i++) {
          console.log(aux
              .filter(fdata => fdata[0] === aux[i][0] && aux[i][0] !== null))
          response.push({ 
            id: i, 
            label: translateGrade(aux[i][0]), 
            value:  aux
              .filter(fdata => fdata[0] === aux[i][0] && aux[i][0] !== null)
              .reduce((total, current) => {
                return total + current[1]
              }, 0)
          });
        }
        console.log(response)
        setPieData(response)
      }
    }, [data])

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
                <SmallBox>
                  <Box sx={{ width: 1 }}>
                    <BarChart
                      xAxis={[
                        {
                          id: 'barCategories',
                          data: ['bar A', 'bar B', 'bar C'],
                          scaleType: 'band',
                        },
                      ]}
                      series={[
                        {
                          data: [2, 5, 3],
                        },
                      ]}
                    />
                  </Box>
                </SmallBox>
                <SmallBox>
                  <h1>
                    Total por matéria
                  </h1>
                  
                  <Paper sx={{
                    paddingTop: '50px',  
                    width: '100%', 
                    height: 'calc(100% - 50px)',
                    borderRadius: 
                    '50px', 
                    zIndex: 1,
                  }}>
                      <PieChart
                        series={[
                          {
                            data: pieData,
                            innerRadius: 40,
                            paddingAngle: 1,
                            cornerRadius: 5,
                            startAngle: -90,
                            endAngle: 270,
                            highlightScope: { 
                              faded: 'global', 
                              highlighted: 'item' 
                            },
                            faded: { 
                              innerRadius: 30, 
                              additionalRadius: -20, 
                              color: 'gray',
                            },
                            cx: '65%',
                            cy: '55%',
                            arcLabel: (item) => `${item.label}`,
                          }]}
                        colors={colorPallete}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { 
                              vertical: 'top', 
                              horizontal: 'middle', 
                            },
                            itemMarkWidth: 20,
                            itemMarkHeight: 20,
                            markGap: 5,
                            itemGap: 10,
                            labelStyle: {
                              fill: '#0B7077',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiPieArcLabel-root': {
                            fill: 'white',
                          }
                        }}
                      />
                  </Paper>
                </SmallBox>
                <SmallBox>
                  b
                </SmallBox>
              </div>
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Grades;
