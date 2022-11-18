import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'country', label: 'Country', minWidth: 100 },
  {
    id: 'totalC',
    label: 'Total Cases',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'newC',
    label: 'New Cases',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tDeaths',
    label: 'Total Deaths',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'nDeaths',
    label: 'New Deaths',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'tRecovered',
    label: 'Total Recovered',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'nRecovered',
    label: 'New Recovered',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'active',
    label: 'Active Cases',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'critical',
    label: 'Critical Cases',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'tCasesM',
    label: 'Total Cases/1Mpop',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'tDeathsM',
    label: 'Total Deaths/1Mpop',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'tTestsM',
    label: 'Total Tests/1Mpop',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];




export default function Statistics({data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '640px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,fontWeight:"bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    <TableRow
                    key={row.country}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.country}
                    </TableCell>
                    <TableCell align="right">{row.cases['1M_pop']}</TableCell>
                    <TableCell align="right">{row.cases.new}</TableCell>
                    <TableCell align="right">{row.deaths.total}</TableCell>
                    <TableCell align="right">{row.deaths.new}</TableCell>
                    <TableCell align="right">{row.cases.recovered}</TableCell>
                    <TableCell align="right">{row.cases.active}</TableCell>
                    <TableCell align="right">{row.cases.critical}</TableCell>
                    <TableCell align="right">{row.cases['1M_pop']}</TableCell>
                    <TableCell align="right">{row.deaths['1M_pop']}</TableCell>
                    <TableCell align="right">{row.tests.total}</TableCell>
                    <TableCell align="right">{row.tests['1M_pop']}</TableCell>
                    <TableCell align="right">{row.population}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}