import React, { useState, useContext } from 'react';
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
import Print from '@material-ui/icons/Print';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Done from '@material-ui/icons/Done';
import MenuFilter from './MenuFilter';
import { parseDate } from '../utils/functions';
import { OptionsContext } from '../context/OptionsContext';
import ButtonCustomIcon from './ButtonCustomIcon';
import { recetaProps } from '../types/recetas';

const propTypes = {
  handleActionPrint: PropTypes.func,
  handleActionDelivered: PropTypes.func,
  handleActionDeleted: PropTypes.func,
  handleActionModify: PropTypes.func,
  handleActionView: PropTypes.func,
  disabledPrint: PropTypes.bool,
  disabledDelivered: PropTypes.bool,
  disabledView: PropTypes.bool,
  rows: PropTypes.arrayOf(recetaProps)
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
  },
  switch: {
    display: 'flex'
  },
  actionscell: {
    display: 'flex'
  },
  cellapproved: {
    backgroundColor: '#11cb5f'
  },
  cellrejected: {
    backgroundColor: '#ff1744'
  }
}));

const RecetaTable = ({
  rows,
  handleActionPrint,
  handleActionDelivered,
  handleActionDeleted,
  handleActionModify,
  handleActionView,
  disabledPrint,
  disabledDelivered,
  disabledView
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState('');
  const { select } = useContext(OptionsContext);

  const filterRows = rows.filter(receta => {
    const { dni, lastname, name, entity, tramite, type } = receta;
    switch (select) {
      case 'Dni':
        return dni.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      case 'Apellido':
        return lastname.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      case 'Nombre':
        return name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      case 'Tramite':
        return tramite.toString().indexOf(filter.toLowerCase()) !== -1;
      case 'Entidad':
        return entity.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      case 'Sistema':
        return type.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      default:
        return lastname.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }
  });

  const ColorCell = state => {
    if (state === 'APROBADO' || state === 'AUDITADO')
      return classes.cellapproved;
    if (state === 'RECHAZADO') return classes.cellrejected;
  };

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
          <MenuFilter
            options={[
              'Tramite',
              'Dni',
              'Apellido',
              'Nombre',
              'Entidad',
              'Sistema'
            ]}
          />
        </Toolbar>

        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                {select === 'Tramite' ? <h3>Tramite</h3> : 'Tramite'}
              </TableCell>
              <TableCell>{select === 'Dni' ? <h3>Dni</h3> : 'Dni'}</TableCell>
              <TableCell>
                {select === 'Apellido' ? <h3>Apellido</h3> : 'Apellido'}
              </TableCell>
              <TableCell>
                {select === 'Nombre' ? <h3>Nombre</h3> : 'Nombre'}
              </TableCell>
              <TableCell>
                {select === 'Entidad' ? <h3>Entidad</h3> : 'Entidad'}
              </TableCell>
              <TableCell>
                {select === 'Sistema' ? <h3>Sistema</h3> : 'Sistema'}
              </TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filterRows.map(row => (
              <TableRow key={row.tramite} className={ColorCell(row.state)}>
                <TableCell component="th" scope="row">
                  {row.number}
                </TableCell>
                <TableCell>{row.dni}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.entity}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{parseDate(row.time)}</TableCell>
                <TableCell>
                  <div className={classes.actionscell}>
                    <ButtonCustomIcon
                      Icon={Print}
                      disabled={disabledPrint}
                      handleClick={() => {
                        return handleActionPrint(row);
                      }}
                    />
                    <ButtonCustomIcon
                      Icon={Done}
                      disabled={disabledDelivered}
                      handleClick={() => {
                        return handleActionDelivered(row);
                      }}
                    />
                    <ButtonCustomIcon
                      Icon={Edit}
                      disabled={row.printed || row.delivered}
                      handleClick={() => {
                        return handleActionModify(row);
                      }}
                    />
                    <ButtonCustomIcon
                      Icon={SerachIcon}
                      disabled={disabledView}
                      handleClick={() => {
                        return handleActionView(row);
                      }}
                    />
                    <ButtonCustomIcon
                      Icon={Delete}
                      disabled={row.printed || row.delivered}
                      handleClick={() => {
                        return handleActionDeleted(row);
                      }}
                    />
                  </div>
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
  handleActionPrint: () => {},
  handleActionDeleted: () => {},
  handleActionDelivered: () => {},
  handleActionModify: () => {},
  handleActionView: () => {},
  disabledPrint: false,
  disabledDelivered: false,
  disabledView: false,
  rows: []
};

RecetaTable.propTypes = propTypes;

export default RecetaTable;
