import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import TopBar from '../../components/table/TopBar';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import SelectMultiple from '../../components/table/SelectMultiple';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import SmallBox from '../../components/SmallBox';
import { fullDataType, semester } from '../../api/rawData';
import { colorPallete, ifNameAlreadyIn, translateGrade } from '../../utils';
import ReactEcharts from "echarts-for-react";
import { useNavigate, useParams } from 'react-router-dom';

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

function Students() {
    const [onPress, setOnPress] = useState(true);
    const [data, setData] = useState<fullDataType[]>([]);
    const [onIsFiltering, setOnIsFiltering] = useState(false);
    const [students, setStudents] = useState<string[]>([])
    const [years, setYears] = useState<number[]>([])
    const [selectedstudents, setSelectedStudents] = useState<string[]>([])
    const [selectedyears, setSelectedYears] = useState<number[]>([])
    const [treatedDataStudent, setTreatedDataStudent] = useState<any[]>([]);
    const [studentData, setStudentData] = useState<fullDataType>();
    const navigate = useNavigate();
    const { name } = useParams();

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
    };

    useEffect(() => {
      fetch("/api/students/data")
        .then((res) => res.json())
        .then((json) => {
          json.sort((studentA: fullDataType, studentB: fullDataType) =>
            ((studentB.firstSemester.average + studentB.secondSemester.average) / 2)
            - ((studentA.firstSemester.average + studentA.secondSemester.average) / 2)
          )
          setData(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        });

      getFilters('');
    }, []);

    useEffect(() => {
      treatDataByStudent(ifNameAlreadyIn(data), setTreatedDataStudent);
    }, [data]);

    useEffect(() => {
      setStudentData({
        ...treatedDataStudent
          .filter((student: fullDataType) => student.name.includes(name as string))[0],
        ...(data as fullDataType[])
          .filter((student: fullDataType) => student.name.includes(name as string))[0],
      });
    }, [treatedDataStudent]);

    const handleFilter = () => {
      let strFilter = '';

      selectedyears.forEach((year) => {
        strFilter = strFilter + '&years[]=' + year
      });

      selectedstudents.forEach((student) => {
        strFilter = strFilter + '&names[]=' + student
      });

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

    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              <TopBar>
                <h1>Alunos</h1>

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
                        text: 'Desempenho',
                        top: '15px',
                        left: '30px',
                        textStyle: {
                          color: '#05434b',
                        },
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
                            .map((tdata) => { 
                            return { 
                              value: tdata.average, 
                              itemStyle: { 
                                color: tdata.name.includes(name)
                                ? '#05434b'
                                : '#a5dae4',
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
                        navigate('/student/' + event.name.slice(
                          event.name.indexOf(') ') != -1 
                            ? 0 
                            : event.name.indexOf(') '), 
                          event.name.length
                        ));
                        navigate(0);
                      }
                    }}
                  />
                </SmallBox>

                <SmallBox>
                  <ReactEcharts
                    style={{height: '400px', width: '100%'}}
                    option={{
                      title: {
                        text: 'Desempenho quanto a média',
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
                        navigate('/student/' + event.name.replace('/(.*)/', ''));
                        navigate(0);
                      }
                    }}
                  />
                </SmallBox>

                <SmallBox>
                  <ReactEcharts 
                    style={{ height: '400px', width: '100%' }}
                    option={{
                      title: {
                        text: 'Média por matéria (primeiro semestre)',
                        top: '15px',
                        left: '30px',
                        textStyle: {
                          color: '#05434b',
                        },
                      },
                      tooltip: {
                        trigger: 'item'
                      },
                      legend: {
                        orient: 'vertical',
                        top: '12%',
                        left: '25px',
                        textStyle: {
                          color: '#05434b',
                        },
                      },
                      xAxis: {
                        type: 'category',
                        data: studentData?.firstSemester ? Object.keys(studentData.firstSemester)
                          .map(key => translateGrade(key.replace('Grade', '')))
                          : [],
                        axisLabel: { interval: 0, rotate: 45 },
                      },
                      yAxis: {
                        type: 'value'
                      },
                      grid: [
                        {
                          height: '60%'
                        },
                      ],
                      series: [
                        {
                          type: 'bar',
                          label: {
                            show: false,
                            position: 'center',
                            color: '#05434b',
                          },
                          data: studentData?.firstSemester ? Object.values(studentData.firstSemester).map((value, index) => {
                            return {
                              value: value,
                              itemStyle: {
                                color: colorPallete[index],
                              },
                            }
                          })
                          : [],
                          markLine: {
                            data: [{ type: 'average', name: 'Avg' }],
                            lineStyle: {
                              color: 'black'
                            }
                          },
                        }
                      ],
                    }}
                  />
                </SmallBox>

                <SmallBox>
                  <ReactEcharts 
                    style={{ height: '400px', width: '100%' }}
                    option={{
                      title: {
                        text: 'Média por matéria (segundo semestre)',
                        top: '15px',
                        left: '30px',
                        textStyle: {
                          color: '#05434b',
                        },
                      },
                      tooltip: {
                        trigger: 'item'
                      },
                      legend: {
                        orient: 'vertical',
                        top: '12%',
                        left: '25px',
                        textStyle: {
                          color: '#05434b',
                        },
                      },
                      xAxis: {
                        type: 'category',
                        data: studentData?.secondSemester ? Object.keys(studentData.secondSemester)
                          .map(key => translateGrade(key.replace('Grade', '')))
                          : [],
                        axisLabel: { interval: 0, rotate: 45 },
                      },
                      yAxis: {
                        type: 'value'
                      },
                      grid: [
                        {
                          height: '60%'
                        },
                      ],
                      series: [
                        {
                          type: 'bar',
                          label: {
                            show: false,
                            position: 'center',
                            color: '#05434b',
                          },
                          data: studentData?.secondSemester ? Object.values(studentData.secondSemester).map((value, index) => {
                            return {
                              value: value,
                              itemStyle: {
                                color: colorPallete[index],
                              },
                            }
                          })
                          : [],
                          markLine: {
                            data: [{ type: 'average', name: 'Avg' }],
                            lineStyle: {
                              color: 'black'
                            }
                          },
                        }
                      ],
                    }}
                  />
                </SmallBox>

                <SmallBox>
                  <ReactEcharts 
                    style={{height: '400px', width: '100%'}}
                    option={{
                      title: {
                        text: 'Presença',
                        top: '15px',
                        left: '30px',
                        textStyle: {
                          color: '#05434b',
                        },
                      },
                      tooltip: {
                        trigger: 'item',
                        formatter: function(params: { value: number }) {
                          return params.value + '%';
                        },
                      },
                      legend: {
                        top: '13%',
                        left: '30px',
                        orient: 'vertical',
                      },
                      series: [
                        {
                          type: 'pie',
                          radius: ['40%', '70%'],
                          avoidLabelOverlap: false,
                          padAngle: 3,
                          startAngle: 180,
                          itemStyle: {
                            borderRadius: 10
                          },
                          label: {
                            show: false,
                            position: 'center'
                          },
                          emphasis: {
                            label: {
                              show: true,
                              fontSize: 30,
                              textStyle: {
                                color: '#05434b',
                              },
                            }
                          },
                          labelLine: {
                            show: false
                          },
                          data:  studentData 
                            ? [
                              { 
                                value: 100 - (
                                  data
                                    .filter((student: fullDataType) => student.name === name)
                                    .reduce((sum, currentValue: fullDataType) => sum + currentValue.presencePercentage, 0)
                                  / data
                                    .filter((student: fullDataType) => student.name === name).length
                                ),
                                name: 'faltas',
                                itemStyle: {
                                  color: '#a5dae4'
                                },
                              },
                              { 
                                value: data
                                    .filter((student: fullDataType) => student.name === name)
                                    .reduce((sum, currentValue: fullDataType) => sum + currentValue.presencePercentage, 0)
                                  / data
                                    .filter((student: fullDataType) => student.name === name).length,
                                name: 'presença',
                                itemStyle: {
                                  color: '#05434b'
                                },
                              },
                            ]
                            : []
                        }
                      ]
                    }}
                  />
                </SmallBox>
                
              </div>
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Students;
