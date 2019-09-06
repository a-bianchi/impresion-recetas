import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SerachIcon from '@material-ui/icons/Search';
import MenuFilter from './MenuFilter';
import ButtonsTable from './ButtonsTable';
import { parseDate } from '../utils/functions';

const propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      tramite: PropTypes.number,
      region: PropTypes.string,
      delegation: PropTypes.string,
      number: PropTypes.string,
      year: PropTypes.string,
      dni: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      type: PropTypes.string,
      state: PropTypes.string,
      entity: PropTypes.string,
      printed: PropTypes.bool,
      delivered: PropTypes.bool,
      time: PropTypes.instanceOf(Date)
    })
  )
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const RecetaTable = ({ rows }) => {
  const [filter, setFilter] = useState('');

  const classes = useStyles();

  const filterRows = rows.filter(receta => {
    const filterDni =
      receta.dni.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    if (!filterDni) {
      return receta.lastname.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }
    return filterDni;
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              Recetas
            </Typography>
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <FormControl className={classes.margin}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Filtrar
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                onChange={e => {
                  setFilter(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SerachIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <MenuFilter />
        </Toolbar>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tramite</TableCell>
              <TableCell>Dni</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Entidad</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filterRows.map(row => (
              <TableRow key={row.tramite}>
                <TableCell component="th" scope="row">
                  {row.number}
                </TableCell>
                <TableCell>{row.dni}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.entity}</TableCell>
                <TableCell>{parseDate(row.time)}</TableCell>
                <TableCell>
                  <ButtonsTable name="Imprimir" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

RecetaTable.defaultProps = {
  rows: []
};

RecetaTable.propTypes = propTypes;

export default RecetaTable;
