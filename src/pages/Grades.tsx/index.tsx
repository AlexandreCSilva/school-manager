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
import SmallBox from '../../components/SmallBox';
import { fullDataType, semester } from '../../api/rawData';
import { colorPallete, ifNameAlreadyIn, translateGrade } from '../../utils';
import ReactEcharts from "echarts-for-react";
import { useNavigate } from 'react-router-dom';

function treatData(data: any, setTreatedData: (response: any[]) => void) {
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
    setTreatedData(response)
  }
}

function calculateAverage(firstSemester: semester & { average: number }, secondSemester: semester & { average: number }): number {
  return (firstSemester.average + secondSemester.average) / 2;
}

function treatDataByStudent(data: any, setTreatedDataStudent: (response: any[]) => void) {
  if (data.length !== 0) {
    const fullData = data as fullDataType[];
    const response: any[] = [];

    fullData.forEach((fdata) => {
      response.push({ 
        id: fdata.studentId, 
        name: fdata.name, 
        average: 
        calculateAverage(fdata.firstSemester, fdata.secondSemester) 
      })
    })

    setTreatedDataStudent(response)
  }
}

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
    const [treatedData, setTreatedData] = useState<any[]>([]);
    const [treatedDataStudent, setTreatedDataStudent] = useState<any[]>([]);
    const navigate = useNavigate();

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
        });

      getFilters('');
    }, []);

    useEffect(() => {
      treatData(data, setTreatedData);
      treatDataByStudent(data, setTreatedDataStudent);
    }, [data]);

    const handleFilter = () => {
      let strFilter = '';

      selectedyears.forEach((year) => {
        strFilter = strFilter + '&years[]=' + year
      });

      selectedstudents.forEach((student) => {
        strFilter = strFilter + '&names[]=' + student
      });

      selectedclasses.forEach((className) => {
        strFilter = strFilter + '&classes[]=' + className
      });

      strFilter = onSlide !== 'nada' ? '&state=' + onSlide + strFilter : '' + strFilter;

      if (strFilter !== '') {
        strFilter = '?' + strFilter.substring(1);
      };

      fetch("/api/students/data" + strFilter)
        .then((res) => res.json())
        .then((json) => {
          setData(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        });

      getFilters(strFilter);
      setOnIsFiltering(false);
    };

    useEffect(() => {
      treatDataByStudent(ifNameAlreadyIn(data), setTreatedDataStudent);
    }, [data]);

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
                  <ReactEcharts 
                    style={{height: '400px', width: '100%'}}
                    option={{
                      title: {
                        text: 'Total por matéria',
                        top: '15px',
                        left: '30px',
                      },
                      dataZoom: [
                        {
                          show: true,
                          realtime: true,
                          start: 0,
                          end: 40,
                        },
                      ],
                      grid: [
                        {
                          height: '60%'
                        },
                      ],
                      xAxis: {
                        type: 'category',
                        data: treatedData
                          .filter(tdata => tdata.label !== 'média')
                          .map(tdata => tdata.label),
                        axisLabel: { interval: 0, rotate: 45 },
                      },
                      yAxis: {
                        type: 'value'
                      },
                      series: [
                        {
                          data: treatedData
                            .filter(tdata => tdata.label !== 'média')
                            .map((tdata, index) => { 
                            return { 
                              value: tdata.value / data.length, 
                              itemStyle: { 
                                color: colorPallete[index]
                              }
                            }
                          }),
                          type: 'bar',
                          markLine: {
                            data: [{ type: 'average', name: 'Avg' }],
                            lineStyle: {
                              color: 'black'
                            }
                          }
                        }
                      ]
                    }}
                  />
                </SmallBox>
                
                <SmallBox>
                  <ReactEcharts
                    style={{height: '400px', width: '100%'}}
                    option={{
                      title: {
                        text: 'Matéria quanto a média',
                        top: '15px',
                        left: '30px',
                        textStyle: {
                          color: '#05434b',
                        },
                      },
                      xAxis: {
                        type: 'category',
                        data: treatedDataStudent
                          .map(tdata => tdata.name),
                        axisLabel: { interval: 0, rotate: 45 }
                      },
                      yAxis: {
                        type: 'value',
                      },
                      grid: [
                        {
                          left: '50px',
                          top: '25%',
                          height: '50%',
                        },
                      ],
                      series: [
                        {
                          type: 'line',
                          data: treatedDataStudent
                            .map((tdata) => {
                              return { 
                                value: 
                                  ((tdata.average / data.length) - 
                                  (treatedDataStudent[0].average / data.length))
                                  .toFixed(2),
                                itemStyle: {
                                  color: tdata.name.includes(name) 
                                    ? '#05434b'
                                    : '#a5dae4',
                                }
                              }  
                            }),
                          markPoint: {
                            data: [
                              { type: 'max', name: 'Max' },
                              { type: 'min', name: 'Min' }
                            ],
                            itemStyle: {
                              color: '#05434b'
                            },
                          },
                          markLine: {
                            data: [{ type: 'average', name: 'Avg' }],
                            lineStyle: {
                              color: '#05434b'
                            },
                          },
                          lineStyle: {
                            color: '#a5dae4',
                            width: 4,
                          },
                        },
                      ]
                    }}
                    onEvents={{
                      'click': (event: { name: string }) => {
                        navigate('/student/' + event.name);
                      }
                    }}
                  />
                </SmallBox>
                
                <SmallBox>
                  <ReactEcharts 
                    style={{height: '400px', width: '100%'}}
                    option={{
                      title: {
                        text: 'Aluno por matéria',
                        top: '15px',
                        left: '30px',
                      },
                      dataZoom: [
                        {
                          show: true,
                          realtime: true,
                          start: 0,
                          end: 100,
                        },
                      ],
                      grid: [
                        {
                          height: '60%'
                        },
                      ],
                      xAxis: {
                        type: 'category',
                        data: treatedDataStudent
                          .map(tdata => tdata.name),
                        axisLabel: { interval: 0, rotate: 45 },
                      },
                      yAxis: {
                        type: 'value'
                      },
                      series: [
                        {
                          data: treatedDataStudent
                            .map((tdata, index) => { 
                            return { 
                              value: tdata.average, 
                              itemStyle: { 
                                color: colorPallete[index]
                              }
                            }
                          }),
                          type: 'bar',
                          markLine: {
                            data: [{ type: 'average', name: 'Avg' }],
                            lineStyle: {
                              color: 'black'
                            }
                          }
                        }
                      ]
                    }} 
                    onEvents={{
                      'click': (event: { name: string }) => {
                        navigate('/student/' + event.name);
                      }
                    }}
                  />
                </SmallBox>

                <SmallBox>
                  <ReactEcharts
                    style={{height: '400px', width: '100%'}}
                    option={{
                      title: {
                        text: 'Aluno quanto a média',
                        top: '15px',
                        left: '30px',
                        textStyle: {
                          color: '#05434b',
                        },
                      },
                      xAxis: {
                        type: 'category',
                        data: treatedDataStudent
                          .map(tdata => tdata.name),
                        axisLabel: { interval: 0, rotate: 45 }
                      },
                      yAxis: {
                        type: 'value',
                      },
                      grid: [
                        {
                          left: '50px',
                          top: '25%',
                          height: '50%',
                        },
                      ],
                      series: [
                        {
                          type: 'line',
                          data: treatedDataStudent
                            .map((tdata) => {
                              return { 
                                value: 
                                  ((tdata.average / data.length) - 
                                  (treatedDataStudent[0].average / data.length))
                                  .toFixed(2),
                                itemStyle: {
                                  color: tdata.name.includes(name) 
                                    ? '#05434b'
                                    : '#a5dae4',
                                }
                              }  
                            }),
                          markPoint: {
                            data: [
                              { type: 'max', name: 'Max' },
                              { type: 'min', name: 'Min' }
                            ],
                            itemStyle: {
                              color: '#05434b'
                            },
                          },
                          markLine: {
                            data: [{ type: 'average', name: 'Avg' }],
                            lineStyle: {
                              color: '#05434b'
                            },
                          },
                          lineStyle: {
                            color: '#a5dae4',
                            width: 4,
                          },
                        },
                      ]
                    }}
                    onEvents={{
                      'click': (event: { name: string }) => {
                        navigate('/student/' + event.name);
                      }
                    }}
                  />
                </SmallBox>
              </div>
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Grades;
