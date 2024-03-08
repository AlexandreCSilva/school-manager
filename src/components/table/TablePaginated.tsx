import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, createTheme } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import React, { Dispatch, SetStateAction } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
}

interface Props {
    length: number;
    page: number;
    rowsPerPage: number;
    setPage: Dispatch<SetStateAction<number>>;
    setRowsPerPage: Dispatch<SetStateAction<number>>;
    handleFilter: () => void;
}

interface TableProps extends Props{
    columns: Column[];
    children: any;
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
  
function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = createTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <MdKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <MdKeyboardDoubleArrowLeft /> : <MdKeyboardDoubleArrowRight />}
                </IconButton>
            </Box>
    );
}

function TableFooter({ 
        length, 
        page, 
        rowsPerPage, 
        setPage, 
        setRowsPerPage,
        handleFilter,
    }: Props) {
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        handleFilter();
    };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='footer'>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                colSpan={3}
                count={length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                    select: {
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                    },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                sx={{
                    color: '#05434b',
                    borderBottom: 0,
                    borderTop: '4px solid #90dae4',
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: -0,

                    '& .MuiToolbar-root': {
                        paddingRight: '50px',
                    }
                }}
            />
        </div>
    );
};

function TablePaginated({ 
        columns, 
        children, 
        length, 
        page, 
        setPage, 
        rowsPerPage, 
        setRowsPerPage, 
        handleFilter,
    }: TableProps) {      
    return(
        <TableContainer 
            sx={{ 
                marginBottom: 60,
                
            }}
        >
            <Table>
                <TableHead
                sx={{ 
                    '*': {
                        color: '#05434b',
                    }
                }}>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody
                sx={{ 
                    '*': {
                        color: '#05434b',
                    }
                }}>
                    { children }
                </TableBody>
                <TableFooter
                    length={length}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    handleFilter={handleFilter}
                />
            </Table>
        </TableContainer>
    );
};

export default TablePaginated;
