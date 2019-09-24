import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      numeroAutorizacion: PropTypes.string,
      numeroReceta: PropTypes.string,
      estado: PropTypes.bool
    })
  )
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 300
  },
  cellapproved: {
    backgroundColor: '#11cb5f'
  },
  cellrejected: {
    backgroundColor: '#ff1744'
  }
}));

const SimpleTable = ({ rows }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" id="tableSimpleTitle">
        Autorizaciónes
      </Typography>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Numero</TableCell>
              <TableCell>Receta</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.numeroAutorizacion}
                className={
                  row.estado ? classes.cellapproved : classes.cellrejected
                }
              >
                <TableCell component="th" scope="row">
                  {row.numeroAutorizacion}
                </TableCell>
                <TableCell>{row.numeroReceta}</TableCell>
                <TableCell>{row.estado ? 'Aprobado' : 'Rechazado'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

SimpleTable.defaultProps = {
  rows: []
};

SimpleTable.propTypes = propTypes;

export default SimpleTable;
