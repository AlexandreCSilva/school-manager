import React, { useEffect, useState } from 'react';
import SideMenu from '../../components/menu/SideMenu';
import { Container } from '../../components/LayoutComponents';
import { BaseBox, ContentBox } from '../../components/ContentBox';
import { toast } from 'react-toastify';
import TopBar from '../../components/table/TopBar';
import SliderOptions from '../../components/table/SliderButton';
import SelectMultiple from '../../components/table/SelectMultiple';
import { Grid, TableCell, TableRow, } from '@mui/material';
import { PaginatedFullDataType, fullDataType } from '../../api/rawData';
import TablePaginated, { Column } from '../../components/table/TablePaginated';

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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        strFilter = strFilter + '&years[]=' + year
      })

      selectedstudents.forEach((student) => {
        strFilter = strFilter + '&names[]=' + student
      })

      selectedclasses.forEach((className) => {
        strFilter = strFilter + '&classes[]=' + className
      })

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

      fetch("/api/students" + strFilter)
        .then((res) => res.json())
        .then((json) => {
          setStudents(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })

      fetch("/api/classes" + strFilter)
        .then((res) => res.json())
        .then((json) => {
          setClasses(json)
        })
        .catch((error) => {
          toast('error on get api data')
          console.log(error.message)
        })
    }

    
    const columns: Column[] = [
      { id: 'name', label: 'Nome', minWidth: 170, align: 'left' },
      { id: 'class', label: 'Classe', minWidth: 80, align: 'center' },
      { id: 'phoneNumber', label: 'Celular', minWidth: 100, align: 'center'  },
    ];
    
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
                            <TableCell component="th" scope="row" align={columns[0].align}>
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align={columns[1].align}>
                                {row.class}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align={columns[2].align} >
                                {row.phoneNumber}
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

export default Dashboard;
