import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import { toast } from 'react-toastify';
import TopBar from '../../components/table/TopBar';
import SliderOptions from '../../components/table/SliderButton';
import SelectMultiple from '../../components/table/SelectMultiple';
import { Grid, TableCell, TableRow, LinearProgress, Typography, Box, linearProgressClasses } from '@mui/material';
import { PaginatedFullDataType, fullDataType } from '../../api/rawData';
import TablePaginated, { Column } from '../../components/table/TablePaginated';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { addPercentage, greenToRedColor, translateState } from '../../utils';

function Overview() {
    const [onPress, setOnPress] = useState(true);
    const [onIsFiltering, setOnIsFiltering] = useState(false);
    const [data, setData] = useState({})
    const [students, setStudents] = useState<string[]>([])
    const [years, setYears] = useState<number[]>([])
    const [classes, setClasses] = useState<string[]>([])
    const [selectedstudents, setSelectedStudents] = useState<string[]>([])
    const [selectedyears, setSelectedYears] = useState<number[]>([])
    const [selectedclasses, setSelectedClasses] = useState<string[]>([])
    const [onSlide, setOnSlide] = useState('nada');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

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
      fetch("/api/students/paginated")
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
      console.log((data as PaginatedFullDataType).totalElements)
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

      fetch("/api/students/paginated?size=" + rowsPerPage + '&start=' + page + strFilter)
        .then((res) => res.json())
        .then((json) => {
          setData(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })

      if (strFilter !== '') {
        strFilter = '?' + strFilter.substring(1)
      }

      getFilters(strFilter)
      setOnIsFiltering(false)
    }

    useEffect(() => {
      setData({})
      handleFilter()
    }, [page, rowsPerPage])

    const columns: Column[] = [
      { id: 'name', label: 'Nome', minWidth: 170, align: 'left' },
      { id: 'class', label: 'Classe', minWidth: 80, align: 'center' },
      { id: 'year', label: 'Ano', minWidth: 80, align: 'center' },
      { id: 'phoneNumber', label: 'Celular', minWidth: 100, align: 'center'  },
      { id: 'state', label: 'Status', minWidth: 100, align: 'center'  },
      { id: 'presencePercentage', label: 'Presença', minWidth: 100, align: 'center'  },
      { id: 'average', label: 'Média', minWidth: 100, align: 'center'  },
    ];
    
    return (
      <Container>
          <SideMenu onPress={onPress} setOnPress={setOnPress}/>

          <ContentBox>
            <BaseBox onPress={onPress} setOnPress={setOnPress}>
              <TopBar>
                <h1>Visão geral</h1>

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
                          size={160}
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
                <TablePaginated 
                  columns={columns}
                  length={(data as PaginatedFullDataType).totalElements}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                >
                  {(data as PaginatedFullDataType).elements
                    ? (data as PaginatedFullDataType).elements.map((row: fullDataType) => {return (
                      <TableRow key={row.name}>
                        <TableCell align={columns[0].align}>
                          {row.name}
                        </TableCell>
                        <TableCell style={{ width: 30 }} align={columns[1].align}>
                          {row.class}
                        </TableCell>
                        <TableCell style={{ width: 30 }} align={columns[1].align}>
                          {row.year}
                        </TableCell>
                        <TableCell style={{ width: 110 }} align={columns[2].align} >
                          {row.phoneNumber}
                        </TableCell>
                        <TableCell 
                          style={{ 
                            width: 80,
                            height: '40px',
                            color: row.state === 'disapproved' 
                              ? 'white' 
                              : '#05434b', 
                            backgroundColor: row.state === 'approved' 
                              ? 'rgb(0, 255, 0)' 
                              : row.state === 'disapproved' 
                                ? 'red' 
                                : 'lightgray', 
                            borderRadius: '50px',
                            backgroundClip: 'content-box, padding-box',
                          }} 
                            align={columns[2].align
                          }
                        >
                          {translateState(row.state)}
                        </TableCell>
                        <TableCell 
                          align={columns[2].align}
                          sx={{
                            width: '100px',
                          }}
                        >
                          <Box 
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: '50px',
                              position: 'relative',
                            }}
                          >
                            <Box 
                              sx={{
                                width: '100%',
                                height: '100%',
                              }}
                            >
                              <LinearProgress 
                                variant="determinate" 
                                value={row.presencePercentage}
                                color='inherit'
                                sx={{
                                  borderRadius: 50,
                                  color: 'blue',
                                  height: '40px',
                                  "--LinearProgress-thickness": "90px",
	                                [`&.${linearProgressClasses.determinate} > .${linearProgressClasses.bar1Determinate}`]: { 
                                    backgroundColor: greenToRedColor(row.presencePercentage) 
                                  },
                                }}
                              />
                            </Box>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                position: 'absolute',
                                width: '100%',
                                color: row.presencePercentage <= 50
                                  ? '#a51515' 
                                  : '#05434b',
                              }}
                            >
                              {addPercentage(row.presencePercentage)}
                            </Typography>
                          </Box>
                         
                        </TableCell>
                        <TableCell 
                          style={{ 
                            width: 30,
                            color: Number(((row.firstSemester.average + row.secondSemester.average) / 2).toFixed(2)) <= 7
                              ? Number(((row.firstSemester.average + row.secondSemester.average) / 2).toFixed(2)) >= 2.5
                                ? '#a51515' 
                                : '#fff'
                              : '#05434b',
                            backgroundColor: greenToRedColor(Number(((row.firstSemester.average + row.secondSemester.average) / 2).toFixed(2)) * 10),
                            borderRadius: '50px',
                            backgroundClip: 'content-box, padding-box',
                          }} 
                          align={columns[2].align} 
                        >
                          {((row.firstSemester.average + row.secondSemester.average) / 2).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )})
                    : ''}
                </TablePaginated>
              </div>
            </BaseBox>
          </ContentBox>
      </Container>
    )
};

export default Overview;
