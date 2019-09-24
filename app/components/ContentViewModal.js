import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { parseDate } from '../utils/functions';
import { recetaProps, recetaDefault } from '../types/recetas';
import SimpleTable from './SimpleTable';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1)
  }
}));

const propTypes = {
  receta: recetaProps
};

const ContentViewModal = ({ receta }) => {
  const { state, atPrinted, atDelivered, time, authorizations } = receta;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.formControl}>
            <TextField
              fullWidth
              data-test="select-state"
              label="Estado"
              value={state}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <TextField
              fullWidth
              data-test="select-carga"
              label="Carga"
              value={parseDate(time)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <TextField
              fullWidth
              data-test="select-printed"
              label="Impreso"
              value={parseDate(atPrinted)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl className={classes.formControl}>
            <TextField
              fullWidth
              data-test="select-delivered"
              label="Entregado"
              value={parseDate(atDelivered)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <SimpleTable rows={authorizations} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

ContentViewModal.defaultProps = {
  receta: recetaDefault
};

ContentViewModal.propTypes = propTypes;

export default ContentViewModal;
