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
    label: 'Tot Cases/1Mpop',
    minWidth: 100,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'tDeathsM',
    label: 'Tot Deaths/1Mpop',
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

// function createData(country,totalC,newC,tDeaths,nDeaths,tRecovered,nRecovered,active,critical,tCasesM,tDeathsM,tTestsM,population) {
//   return (country,totalC,newC,tDeaths,nDeaths,tRecovered,nRecovered,active,critical,tCasesM,tDeathsM,tTestsM,population );
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];


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
                    key={row.name}
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