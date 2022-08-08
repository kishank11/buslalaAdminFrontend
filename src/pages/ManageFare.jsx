import React from 'react'
//Material-UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Edit from '../components/Edit';

function createData(id, source, destination, fare, edit) {
    return { id, source, destination, fare, edit };
}

const rows = [
    createData('1', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('2', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('3', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('4', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('5', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('6', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('7', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('8', 'Delhi', 'Mumbai', '1200', 'Edit'),
    createData('9', 'Delhi', 'Mumbai', '1200', 'Edit'),
];

const ManageFare = () => {
    return (
        <div className='h-full flex items-center justify-center flex-col overflow-y-scroll px-8'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }} aria-label="caption table">
                    <TableHead style={{ boxShadow: '0px 1px 9px rgba(0, 0, 0, 0.12)', borderRadius: '12px' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Source</TableCell>
                            <TableCell align="center">Destination</TableCell>
                            <TableCell align="center">Fare</TableCell>
                            <TableCell align="center">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.source}</TableCell>
                            <TableCell align="center">{row.destination}</TableCell>
                            <TableCell align="center">{row.fare}</TableCell>
                            <TableCell align="center"><Edit title={row.edit}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ManageFare
