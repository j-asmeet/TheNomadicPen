import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: 'bolder',
    borderBottom: '1px solid black', 
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

function TrendingBloggers({ data }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table className={classes.table}>
        <TableHead className="TableHeader">
          <TableRow>
            <TableCell className={classes.tableHeaderCell} style={{ fontWeight: 'bold'  }}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell} style={{ fontWeight: 'bold'  }}>Email</TableCell>
            <TableCell className={classes.tableHeaderCell} style={{ fontWeight: 'bold'  }}>Total Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((blogger) => (
            <TableRow key={blogger.email} className={classes.tableRow}>
              <TableCell>{blogger.name}</TableCell>
              <TableCell>{blogger.email}</TableCell>
              <TableCell>{blogger.totalLikes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TrendingBloggers;
