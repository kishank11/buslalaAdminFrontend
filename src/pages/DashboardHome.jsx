import React from 'react'
import { GrBus } from 'react-icons/gr';
//Material-UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(busNo, driverNo, sourceLocation, destination, date, time, remarks) {
    return { busNo, driverNo, sourceLocation, destination, date, time, remarks };
}

const rows = [
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
    createData('MH 06 TF 2564', '0562', 'Delhi', 'Mumbai', '21 Oct 2020', '07:05pm'),
];

const DashboardHome = () => {
    return (
        <div className='h-full flex items-center justify-center flex-col overflow-y-scroll px-8'>
            <h2 className='flex items-center text-left w-full pb-4 text-3xl'><GrBus className='mr-4'/>All Buses</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }} aria-label="caption table">
                    <TableHead style={{ boxShadow: '0px 1px 9px rgba(0, 0, 0, 0.12)', borderRadius: '12px' }}>
                        <TableRow>
                            <TableCell>Bus No</TableCell>
                            <TableCell align="center">Driver No</TableCell>
                            <TableCell align="center">Source Location</TableCell>
                            <TableCell align="center">Destinaton</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Remarks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.busNo}>
                            <TableCell component="th" scope="row">
                                {row.busNo}
                            </TableCell>
                            <TableCell align="center">{row.driverNo}</TableCell>
                            <TableCell align="center">{row.sourceLocation}</TableCell>
                            <TableCell align="center">{row.destination}</TableCell>
                            <TableCell align="center">{row.date}</TableCell>
                            <TableCell align="center">{row.time}</TableCell>
                            <TableCell align="center">{row.remarks}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DashboardHome
